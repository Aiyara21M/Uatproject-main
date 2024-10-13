export const authenticate = (response, next) => {
    if (typeof window !== "undefined") { // ตรวจสอบการเข้าถึง window
      // เก็บข้อมูล token และ user ลงใน session storage
      sessionStorage.setItem("token", JSON.stringify(response.data.token)); // เก็บ token
      sessionStorage.setItem("UUID", JSON.stringify(response.data.UUID)); // เก็บ user
      sessionStorage.setItem("Profileimg", JSON.stringify(response.data.Profileimg)); // เก็บ token
      sessionStorage.setItem("departments", JSON.stringify(response.data.departments)); // เก็บ user
    }
    next();
  };

  export const getProfileimg =()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("Profileimg")){
          return JSON.parse(sessionStorage.getItem("Profileimg"));
        }
        else{
          return false;
        }
    }
  }


  export const getDepartments =()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("departments")){
          return JSON.parse(sessionStorage.getItem("departments"));
        }
        else{
          return false;
        }
    }
  }




  //ดึง token 
export const getToken =()=>{
  if(window !== "undefined"){
      if(sessionStorage.getItem("token")){
        return JSON.parse(sessionStorage.getItem("token"));
      }
      else{
        return false;
      }
  }
}

  //ดึง user
  export const getUser =()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("UUID")){
          return JSON.parse(sessionStorage.getItem("UUID"));
        }
        else{
          return false;
        }
    }
  }

  export const logout = (next) => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("UUID");
      sessionStorage.removeItem("departments");
      sessionStorage.removeItem("Profileimg");
    }
    next();
  };