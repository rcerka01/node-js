var secret = require("./secret");

module.exports = {
    app: {
        port: 3000
    },
    api: {
        protocol: "http",
        port: "3000",
        maxReloadToken: 5
    },
    user: {
        apiKey: secret.apiKey,
        username: "raitis.cerkasovs@gmail.com",
        password: secret.password,
        cert: {
            private: "client-2048.key",
            public: "client-2048.crt",
            passphrase: secret.passphrase
        }
    }
}