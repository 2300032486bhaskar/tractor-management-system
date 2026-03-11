import { useState } from "react";

export default function MachineInspection() {

  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(
      "http://localhost:5001/detect-damage",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    setResult(data);

  };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Machine Damage Detection
      </h1>

      <input
        type="file"
        onChange={(e)=>setImage(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-green-700 text-white px-4 py-2 ml-4"
      >
        Analyze
      </button>

      {result && (

        <div className="mt-6">

          <h2 className="font-bold">
            Detection Result
          </h2>

          <pre>
            {JSON.stringify(result, null, 2)}
          </pre>

        </div>

      )}

    </div>

  );
}