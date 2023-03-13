import NavBar from "@/components/NavBar";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();
  console.log(router);

  return (
    <div>
      <NavBar />
      <input
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <div>{name}</div>
      <div>Hello</div>

      <style jsx>{`
        input {
          background-color: tomato;
        }
      `}</style>
    </div>
  );
}
