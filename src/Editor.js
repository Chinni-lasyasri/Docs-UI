import { useEffect, useState } from "react";
import { socket } from "./socket";

function Editor({ docId, username }) {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("join-document", {
      docId,
      username,
    });

    socket.on("load-document", (content) => {
      setText(content);
    });

    socket.on("receive-changes", (content) => {
      setText(content);
    });

    return () => {
      socket.off("receive-changes");
      socket.off("load-document");
    };
  }, [docId, username]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    socket.emit("send-changes", {
      docId,
      content: value,
    });
  };

  return (
    // <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <div
  style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingRight: 30,   // space on the right
    // paddingLeft: 10     // optional (keeps it balanced)
  }}
>
      {/* <h3 style={{ marginBottom: 10 }}>Document: {docId}</h3> */}
      {/* <h3>Document: {docId}</h3> */}

      <textarea
        value={text}
        onChange={handleChange}
        style={{
          flex: 1,
          width: "100%",
          resize: "none",
          border: "1px solid #ddd",
          borderRadius: 6,
          padding: 12,
          fontSize: 14,
          outline: "none",
        }}
      />
    </div>
  );

// return (
// //   <div
// //     style={{
// //       flex: 1,
// //       display: "flex",
// //       justifyContent: "center",
// //       alignItems: "flex-start",
// //       background: "#f1f3f4",
// //       paddingTop: 30,
// //     }}
// //   >
// //     {/* Document Page */}
// //     <div
// //       style={{
// //         width: 800,
// //         minHeight: "85vh",
// //         background: "white",
// //         boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
// //         borderRadius: 4,
// //         padding: "40px 50px",
// //         display: "flex",
// //         flexDirection: "column",
// //       }}
// //     >
// //       {/* <h3 style={{ marginBottom: 20 }}>Document: {docId}</h3> */}

// //       <textarea
// //         value={text}
// //         onChange={handleChange}
// //         style={{
// //           flex: 1,
// //           width: "100%",
// //           border: "none",
// //           outline: "none",
// //           resize: "none",
// //           fontSize: 16,
// //           lineHeight: 1.6,
// //           fontFamily: "Arial, sans-serif",
// //         }}
// //       />
// //     </div>
// //   </div>
// <div
//   style={{
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     padding: "0 30px 20px 20px"   // this creates the right spacing
//   }}
// >
//   <h3 style={{ marginBottom: 10 }}>Document: {docId}</h3>

//   <textarea
//     value={text}
//     onChange={handleChange}
//     style={{
//       flex: 1,
//       width: "100%",
//       resize: "none",
//       border: "1px solid #ddd",
//       borderRadius: 6,
//       padding: 14,
//       fontSize: 15,
//       outline: "none",
//       background: "#fff"
//     }}
//   />
// </div>
// );
}

export default Editor;