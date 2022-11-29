import express from "express";
import si from "systeminformation";

const app: express = express();

interface ISystemInformation {
    cpu: si.Systeminformation.CpuData;
    system: si.Systeminformation.SystemData;
    mem: si.Systeminformation.MemData;
    os: si.Systeminformation.OsData;
    currentLoad: si.Systeminformation.CurrentLoadData;
    processes: si.Systeminformation.ProcessesData;
    diskLayout: si.Systeminformation.DiskLayoutData[];
    networkInterfaces: si.Systeminformation.NetworkInterfacesData[];
}

app.get("/api/v1/sysinfo", async (req, res)  => {

    const systemInfo : ISystemInformation = {} as ISystemInformation;

    systemInfo.cpu = await si.cpu();
    systemInfo.system = await si.system();
    systemInfo.mem = await si.mem();
    systemInfo.os = await si.osInfo();
    systemInfo.currentLoad = await si.currentLoad();
    systemInfo.processes = await si.processes();
    systemInfo.diskLayout = await si.diskLayout();
    systemInfo.networkInterfaces = await si.networkInterfaces();

    res.status(200).send(systemInfo);
});

app.get("/*", (req, res) => {
    res.status(404).send({Error: "404"});
});

const server = app.listen(8080, () => console.log("listening on port 8000..."));

export default server;




