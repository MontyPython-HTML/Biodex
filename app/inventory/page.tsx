export default function Inventory () {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        action="/action_page.php"
        method="post"
        encType="multipart/form-data"
        className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Upload File</h2>

        <input
          type="file" id="myFile" name="filename"
          className="border border-gray-300 rounded p-2 cursor-pointer"
        />

        <input
          type="submit" value="Submit" className="bg-navy text-white font-medium py-2 rounded hover:bg-green-600 transition-colors cursor-pointer"
        />
      </form>
    </div>
  );
}
