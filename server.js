// server.js
// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(router);
// server.listen(3000, () => {
//   console.log("JSON Server is running");
// });

// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// 상세페이지 후기가 정상적으로 삭제되지 않아 아래 내용 추가
server.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  const db = router.db; // Lowdb 인스턴스에 접근

  // db.json의 comments에서 특정 id에 해당하는 댓글을 삭제
  const comments = db.get("comments").value();
  const commentIndex = comments.findIndex(
    (comment) => comment.id === parseInt(id)
  );

  if (commentIndex !== -1) {
    // 해당 댓글 삭제
    db.get("comments").splice(commentIndex, 1).write();
    res.status(200).json({ message: `Comment with id ${id} deleted` });
  } else {
    res.status(404).json({ error: "Comment not found" });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
