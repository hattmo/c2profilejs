import { promises as fsp } from "fs";
import keygen from "../src/server/helpers/keyStoreFunctions";

describe("keyStoreFunctions Test", () => {
    const uniquepath = "mytestpath";

    const keystore = {
        alias: "mykey",
        password: "password",
        id: "testkeystore",
    };
    const cakeystore = {
        alias: "ca",
        password: "password",
        id: "testcakeystore",
    };
    const opt = {
        dname: [{ key: "CN", value: "catest.com" }, { key: "OU", value: "hattmo" }, { key: "O", value: "universe" }],
    };
    const caopt = {
        dname: [{ key: "CN", value: "catest.com" }, { key: "OU", value: "hattmo" }, { key: "O", value: "universe" }],
    };

    before(async () => {
        await keygen.checkDirs();
        await fsp.mkdir(`temp/${uniquepath}`);
    });

    describe("Partial tests", () => {
        describe("CA test", () => {
            describe("genkeypair_CA", () => {
                it("Should generate a keypair", () => keygen.genkeypair(cakeystore, caopt, uniquepath));
            });
            after(() => fsp.copyFile(`temp/${uniquepath}/${cakeystore.id}.jks`, `keystores/${cakeystore.id}.jks`));
        });

        describe("genkeypair", () => {
            it("Should generate a keypair", () => keygen.genkeypair(keystore, opt, uniquepath));
        });

        describe("certreq", () => {
            it("Should generate a certreq", () => keygen.certreq(keystore, uniquepath));
        });

        describe("gencert", () => {
            it("Should generate a signed cert", () => keygen.gencert(cakeystore, uniquepath));
        });

        describe("exportcert", () => {
            it("Should export the CA cert", () => keygen.exportcert(cakeystore, uniquepath, "CA.crt"));
        });

        describe("importcert", () => {
            it("Should import a CA cert", () => keygen.importcert({
                alias: "CA",
                password: keystore.password,
                id: keystore.id,
            }, uniquepath, "CA.crt"));
            it("should import a signed cert", () => keygen.importcert(keystore, uniquepath, "temp.crt"));
        });

        after(async () => {
            const files = await fsp.readdir(`temp/${uniquepath}`);
            const filePromises: Array<Promise<void>> = [];
            files.forEach((file) => {
                filePromises.push(fsp.unlink(`temp/${uniquepath}/${file}`));
            });
            await Promise.all(filePromises);
            await fsp.rmdir(`temp/${uniquepath}`);
        });
    });

    describe("full tests", () => {
        const fullkeystoreun = {
            alias: "mykey",
            password: "password",
            id: "unsignedfulltestkeystore",
        };
        const fullkeystore = {
            alias: "mykey",
            password: "password",
            id: "signedfulltestkeystore",
        };

        const fulloptun = {
            dname: [{ key: "CN", value: "catest.com" },
            { key: "OU", value: "hattmo" },
            { key: "O", value: "universe" }],
        };
        const fullopt = {
            dname: [{ key: "CN", value: "catest.com" },
            { key: "OU", value: "hattmo" },
            { key: "O", value: "universe" }],
        };

        describe("generateKeyStore", () => {
            it("Should generate a keystore with a unsiqned cert",
                () => keygen.generateKeyStore(fullkeystoreun, fulloptun));
            it("Should generate a keystore with a signed cert",
                () => keygen.generateKeyStore(fullkeystore, fullopt, cakeystore));
        });

        after(async () => {
            const files = await fsp.readdir("keystores");
            const filePromises: Array<Promise<void>> = [];
            files.forEach((file) => {
                filePromises.push(fsp.unlink(`keystores/${file}`));
            });
            await Promise.all(filePromises);
        });
    });
});
