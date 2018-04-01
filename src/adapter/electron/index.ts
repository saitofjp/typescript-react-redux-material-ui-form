import { BrowserWindow, RendererInterface, Remote } from "electron";

const electron =():RendererInterface | false  =>
    (<any>window).require ? (<any>window).require('electron') : false

export const isElectron =  ():boolean => electron() ? true : false;

export interface ElectronAdapter {
    openNewwindow: ()=> void;
}

export const create =() : ElectronAdapter =>{
    const e = electron();
    if(e) {
        return new ElectronAdapterRemote(e);
    }else {
        return new ElectronAdapterStub();
    }
}

class ElectronAdapterRemote implements ElectronAdapter {
    private remote:Remote;
    constructor( electron:RendererInterface) {
        this.remote = electron.remote;
    }
    openNewwindow = () => {
        var BrowserWindow = this.remote.require('electron').BrowserWindow;
        const main:BrowserWindow = new BrowserWindow({});
        main.isModal
    }
}

class ElectronAdapterStub implements ElectronAdapter {
    openNewwindow = () => {
        this.log("openNewwindow");
    }
    log (log:String)  { console.log(`remote :${log}`)}
}