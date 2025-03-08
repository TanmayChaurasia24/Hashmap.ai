import axios from "axios";
import Cookies from "js-cookie";
export const token = Cookies.get("User");
export const fetchUserDetail = async () => {
    try {
      const response: any = await axios.get(
        "http://localhost:3000/api/auth/info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if(!response.data) {
        console.log("no response while fetching user information");
        return;
      }

      console.log("user is: ", response.data);
      return response.data.user
      
    } catch (error: any) {
      console.log("error while fetching user detail: ", error);
      console.log(
        "error while fetching user detail message: ",
        error.message
      );
    }
  };