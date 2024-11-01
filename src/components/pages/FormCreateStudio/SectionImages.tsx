import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export const SectionImages = ({onChangeInfo}) => {
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [portfolioFiles, setPortfolioFiles] = useState([]);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      onChangeInfo({profileImageFile, portfolioFiles})
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImageFile(null);
    onChangeInfo({profileImageFile, portfolioFiles})
  };

  const handleRemoveFile = (index: number) => {
    setPortfolioFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      onChangeInfo({ profileImageFile, portfolioFiles: updatedFiles }); // Llamada con el valor actualizado
      return updatedFiles;
    });
  };

  const handlePortfolioFilesChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files);
    const totalFiles = portfolioFiles.length + selectedFiles.length;

    if (totalFiles > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    setPortfolioFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...selectedFiles]
      onChangeInfo({ profileImageFile, portfolioFiles: updatedFiles }); // Llamada con el valor actualizado
      return updatedFiles;
    });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Images</h2>
      <div className="space-y-4">
        <div>
          <FormControl orientation="horizontal">
            <FormLabel>Profile Image:</FormLabel>
            <Button
              id="profileImageInput"
              onChange={handleFileChange}
              component="label"
              role={undefined}
              tabIndex={-1}
              color="neutral"
              startDecorator={
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </SvgIcon>
              }
            >
              Upload a file
              <VisuallyHiddenInput type="file" />
            </Button>
          </FormControl>
          <label
            htmlFor="profileImageInput"
            style={{ cursor: "pointer", color: "blue" }}
          >
            Choose Image
          </label>
          {profileImageFile && (
            <div
              style={{
                position: "relative",
                width: "100px",
                marginTop: "10px",
              }}
            >
              <img
                src={URL.createObjectURL(profileImageFile)}
                alt="Profile Preview"
                style={{ width: "100%", height: "auto", borderRadius: "4px" }}
              />
              <button
                type="button"
                onClick={handleRemoveProfileImage}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div>
          <FormControl orientation="horizontal">
            <FormLabel>Portfolio Images (up to 10):</FormLabel>
            <Button
              id="portfolioImagesInput"
              onChange={handlePortfolioFilesChange}
              component="label"
              role={undefined}
              tabIndex={-1}
              color="neutral"
              startDecorator={
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </SvgIcon>
              }
            >
              Upload a file
              <VisuallyHiddenInput type="file" multiple />
            </Button>
          </FormControl>
          <label
            htmlFor="portfolioImagesInput"
            style={{ cursor: "pointer", color: "blue" }}
          >
            Choose Images
          </label>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {portfolioFiles.map((file, index) => (
              <div key={index} style={{ position: "relative", width: "100px" }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionImages;
