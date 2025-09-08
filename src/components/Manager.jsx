import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LuBlocks } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

const Manager = () => {
  const [form, setform] = useState({ url: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getpasswords = async ()=>{
    let req = await fetch("http://localhost:3000/")
    let Passwords = await req.json()
    setpasswordArray(Passwords);
}

  useEffect(() => {
    getpasswords()
  }, []);

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const save = async () => {
    if ((form.url, form.username, form.password).trim() !== "") {
      
      setpasswordArray([...passwordArray,{...form,id:uuidv4()}])
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
      
      setform({ url: "", username: "", password: "" });
      toast("Password Saved!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    }
  };

  const deletepass = async (id) => {
    let c = confirm("Are you want to delete password ?")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id));

      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})
    
      toast("Password Deleted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    }
  };

  const editpass = async (id) => {
    await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
    setform({...passwordArray.filter(i => i.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const [show, setshow] = useState(false);
  const handleshow = () => {
    setshow(!show);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex py-6 items-center gap-3 max-sm:flex-col">
        <input
          className="bg-white w-[20vw] rounded-3xl p-2 px-7 text-black focus:outline-none max-sm:w-80"
          placeholder="Enter Url"
          id="url"
          name="url"
          value={form.url}
          onChange={handlechange}
        />

        <input
          className="bg-white w-[20vw] rounded-3xl p-2 px-7 text-black focus:outline-none max-sm:w-80"
          placeholder="Enter Username"
          id="username"
          name="username"
          value={form.username}
          onChange={handlechange}
        />

        <div className="relative">
          <input
            className="bg-white w-[20vw] rounded-3xl p-2 px-7 text-black focus:outline-none max-sm:w-80"
            placeholder="Enter Password "
            id="password"
            name="password"
            type={show ? "text" : "password"}
            value={form.password}
            onChange={handlechange}
          />

          <div
            className="text-lg absolute right-[25px] top-[11px] text-black cursor-pointer opacity-[.6]"
            onClick={handleshow}
          >
            {show ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <button
          className="bg-slate-300 font-bold rounded-4xl px-3 py-2 text-black  cursor-pointer flex items-center gap-1 hover:scale-[.96] active:bg-slate-400 transition-all duration-300"
          onClick={save}
        >
          <LuBlocks className="text-xl" /> Save
        </button>
      </div>

      <h1 className="text-white text-xl p-2 font-extralight">
        Manager Your Passwords here
      </h1>
      <div className="min-w-[98vw] min-h-[65vh] px-10 bg-zinc-900 text-white rounded-xl overflow-hidden max-sm:px-3 max-sm:min-h-[60vh]">
        {passwordArray.length === 0 && (
          <div className="font-bold p-3">No Passwords to show</div>
        )}
        {passwordArray.length != 0 && (
          <table className="table-auto w-[100%]">
            <thead className=" text-purple-600 border-b-2 border-zinc-600">
              <tr>
                <th className="py-3">Site</th>
                <th className="py-3">Username</th>
                <th className="py-3">Password</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center py-2 w-30">
                      <div className="flex items-center justify-center max-sm:w-20">
                        <a href={item.url} target="_blank">
                          {item.url}
                        </a>
                      </div>
                    </td>
                    <td className="text-center py-2 w-30 ">
                      <div className="flex items-center justify-center gap-3 ">
                        <span>{item.username}</span>
                        <FaRegCopy
                          className="cursor-pointer active:text-gray-600 opacity-[0.8]"
                          onClick={() => copyText(item.username)}
                        />
                      </div>
                    </td>
                    <td className="text-center py-2 w-30 ">
                      <div className="flex items-center justify-center gap-3 ">
                        <span>{"*".repeat(item.password.length)}</span>
                        <FaRegCopy
                          className="cursor-pointer active:text-gray-600  opacity-[0.8]"
                          onClick={() => copyText(item.password)}
                        />
                      </div>
                    </td>
                    <td className="text-center py-2 w-30 ">
                      <div className="flex items-center justify-center gap-3 ">
                        <FaEdit
                          className="text-xl cursor-pointer hover:opacity-[0.6]"
                          onClick={() => editpass(item.id)}
                        />
                        <MdDeleteSweep
                          className="text-2xl cursor-pointer hover:opacity-[0.6]"
                          onClick={() => deletepass(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
