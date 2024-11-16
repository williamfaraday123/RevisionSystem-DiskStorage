const FileUploader = ({ setFile }) => {
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return(
        <div>
            <input type="file" onChange={handleFileChange} /> Only pdf format allowed
        </div>
    );
}

export default FileUploader;