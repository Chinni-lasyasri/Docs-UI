import { useState } from "react";
import Editor from "./Editor";

function Dashboard({ username }) {
  const [documents, setDocuments] = useState([]);
  const [activeDoc, setActiveDoc] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempName, setTempName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const MAX_DOCS = 50;

  const createDocument = () => {
    if (documents.length >= MAX_DOCS) {
      alert(`Maximum ${MAX_DOCS} documents allowed`);
      return;
    }

    const newDocId = `Doc ${documents.length + 1}`;
    setDocuments([...documents, newDocId]);
    setActiveDoc(newDocId);
  };

  const startRename = (index, currentName) => {
    setEditingIndex(index);
    setTempName(currentName);
  };

  const saveRename = (index) => {
    const oldName = documents[index];
    const newName = tempName.trim();

    if (newName === oldName) {
      setEditingIndex(null);
      return;
    }

    if (newName === "") {
    //   alert("Document name cannot be empty");
      setTempName(oldName);
      setEditingIndex(null);
      return;
    }

    if (documents.includes(newName)) {
      alert("Document name already exists");
      setTempName(oldName);
      setEditingIndex(null);
      return;
    }

    const updatedDocs = [...documents];
    updatedDocs[index] = newName;

    setDocuments(updatedDocs);

    if (activeDoc === oldName) {
      setActiveDoc(newName);
    }

    setEditingIndex(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      {sidebarOpen && (
        <div
          style={{
            width: 260,
            borderRight: "1px solid #ddd",
            background: "#f7f9fc",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
              borderBottom: "1px solid #eee",
            }}
          >
            <span
              onClick={() => setSidebarOpen(false)}
              style={{ cursor: "pointer", fontSize: 18 }}
            >
              ←
            </span>

            <div style={{ fontSize: 14, fontWeight: 500 }}>
              Document tabs
            </div>

            <span
              onClick={createDocument}
              style={{ cursor: "pointer", fontSize: 18 }}
            >
              +
            </span>
          </div>

          {/* Scrollable Tabs */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 10,
            }}
          >
            {documents.map((doc, index) => (
              <div
                key={index}
                style={{
                  padding: "8px 10px",
                  borderRadius: 10,
                  marginBottom: 6,
                  background: activeDoc === doc ? "#dbe6f6" : "transparent",
                  cursor: "pointer",
                }}
              >
                {editingIndex === index ? (
                  <input
                    value={tempName}
                    autoFocus
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={() => saveRename(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveRename(index);
                    }}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                    }}
                  />
                ) : (
                  <span
                    style={{ width: "100%" }}
                    onClick={() => setActiveDoc(doc)}
                    onDoubleClick={() => startRename(index, doc)}
                  >
                    {doc}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collapsed Sidebar */}
      {!sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(true)}
          style={{
            position: "absolute",
            top: 15,
            left: 15,
            background: "#eef2f7",
            borderRadius: 20,
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          ☰
        </div>
      )}

      {/* Editor Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          background: "#f5f6f8",
          paddingTop: 30,
        }}
      >
        <div
          style={{
            width: 850,
            height: "90%",
            background: "white",
            borderRadius: 10,
            padding: 25,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {activeDoc ? (
            <Editor docId={activeDoc} username={username} />
          ) : (
            // <h3>Select or create a document</h3>
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;