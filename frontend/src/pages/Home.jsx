// export default function Home() {
//   return <h1 className="text-2xl font-bold">Welcome to Frozen Food Store</h1>;
// }

import api from "../api/axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    api.get("/products")
      .then(res => console.log("Products API Response:", res.data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return <h1 className="text-2xl font-bold">Welcome to Frozen Food Store</h1>;
}

