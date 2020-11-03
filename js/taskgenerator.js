

export class TaskGenerator{
    constructor(){
        this.grantaccess = {function: "door", type: "lock", input: {data: "temporary"}, log: true};

        this.getstatus = {function: "status", type: "status", input: {}, log: true};

        this.startbuzzer = {function: "buzzer", type: "buzzer", input: {data: "start"}, log: false};
             
        this.stopbuzzer = {function: "buzzer", type: "buzzer", input: {data: "stop"}, log: false};

        this.user = {function: "database", type: "user", action: "", input: {}, log: true};
                
        this.tempQR = {function: "database", type: "tempQR", action: "", input: {}, log: true};
        }
              
    startBuzzer(){
        return (this.startbuzzer);
    }
    
    stopBuzzer(){
        return (this.stopbuzzer);
    }
    
    grantAccess(){
        return (this.grantaccess);
    }
    
    getStatus(){
        return (this.getstatus);
    }
    
    getUsers(){
        var task = this.user;
        task["action"] = "getall";
		task["input"] = {};
        return task;
	}
    
    getUser(user){
        var task = this.user;    
        task["action"] = "get";
        task["input"] = {user: user};
        return task;
	}
    
    getUserLimited(user){
        var task = this.user;
        task["action"] = "getlimited";
        task["input"] = {user: user};
        return task;
    }
    
    getUserDefault(){
        var task = this.user;
        task["action"] = "getdefault";
		task["input"] = {};
        return task;
    }
    
    setUser(userdata){
        var task = this.user;
        task["action"] = "set";
        task["input"] = {userdata: userdata};
        return task;
    }

    addUser(userdata){
        var task = this.user; 
        task["action"] = "add";
        task["input"] = {userdata: userdata};
        return task;
    }
    
    removeUser(user){
        var task = this.user;
        task["action"] = "remove";
        task["input"] = {user: user};
        return task;
    }

    
    getTempQRs(){
        var task = this.tempQR;
        task["action"] = "getall";
		task["input"] = {};
        return task;
	}
    
    getTempQR(tempQR){
        var task = this.tempQR;
        task["action"] = "get";
        task["input"] = {tempQR: tempQR};
        return task;
	}
    
    getTempQRDefault(){
        var task = this.tempQR;
        task["action"] = "getdefault";
		task["input"] = {};
        return task;
	}
    
    setTempQR(tempQRdata){
        var task = this.tempQR;
        task["action"] = "set";
        task["input"] = {tempQRdata: tempQRdata};
        return task;
	}

    addTempQR(tempQRdata){
        var task = this.tempQR;
        task["action"] = "add";
        task["input"] = {tempQRdata: tempQRdata};
        return task;
    }
    
    removeTempQR(tempQR){
        var task = this.tempQR;
        task["action"] = "remove";
        task["input"] = {tempQR: tempQR};
        return task;
    }
}