import app from "./app";

const server = app.listen(app.get("port"), () => {
    console.log(
        app.get("port"),
        app.get("env"));

    console.log("  Press CTRL-C to stop\n");
});

export default server;

