const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const layersData = [
  [
    [24.86, 67.01, 0.0],
    [31.5497, 74.3436, 0.0],
    [32.15, 74.1833, 0.0],
  ],
  [
    [34.75, 72.3572, 0.7],
    [25.3792, 68.3683, 0.7],
    [32.0836, 72.6711, 0.7],
  ],
  [
    [31.1167, 74.45, 0.7],
    [34.7717, 72.36, 0.7],
    [34.15, 73.2167, 0.7],
  ],
];

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("data", (data) => {
    console.log(data);
    if (data.type.toLowerCase().trim() === "recovered")
      layersData[0].push([
        Number(data.lat),
        Number(data.lng),
        Number(data.int),
      ]);
    else if (data.type.toLowerCase().trim() === "affected")
      layersData[1].push([
        Number(data.lat),
        Number(data.lng),
        Number(data.int),
      ]);
    else
      layersData[2].push([
        Number(data.lat),
        Number(data.lng),
        Number(data.int),
      ]);
    socket.emit("data", layersData);
  });
});

app.get("/heatMap", (req, res) => {
  res.send(layersData);
});

http.listen(4000, () => {
  console.log("server started at 4000");
});
