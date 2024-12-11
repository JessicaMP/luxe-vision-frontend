import { useEffect, useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import { PortfolioPhoto } from "@/types/studio";
import React from "react";

interface SectionImagesProps {
  onChangeInfo: (data: any) => void;
  isEdit?: boolean;
  initialData?: {
    profileImage?: string;
    portfolioPhotos?: PortfolioPhoto[];
    profileImageFile?: File | null;
    portfolioFiles?: File[];
  };
}

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

export const SectionImages = ({
  onChangeInfo,
  isEdit = false,
  initialData = {},
}: SectionImagesProps) => {
  const [profileImage, setProfileImage] = useState<string | undefined>(
    initialData?.profileImage
  );
  const [portfolioPhotos, setPortfolioPhotos] = useState<PortfolioPhoto[]>(
    initialData?.portfolioPhotos || []
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(
    initialData?.profileImageFile || null
  );
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>(
    initialData?.portfolioFiles || []
  );

  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

  useEffect(() => {
    if (!isInitialDataLoaded) {
      setProfileImage(initialData?.profileImage);
      setPortfolioPhotos(initialData?.portfolioPhotos || []);
      setProfileImageFile(initialData?.profileImageFile || null);
      setPortfolioFiles(initialData?.portfolioFiles || []);
      setIsInitialDataLoaded(true);
    }
  }, [initialData, isInitialDataLoaded]);

  const updateParent = () => {
    onChangeInfo({
      profileImage,
      profileImageFile,
      portfolioPhotos,
      portfolioFiles,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(undefined);
      setProfileImageFile(file);
      onChangeInfo({
        profileImageFile: file,
        profileImage: undefined,
        portfolioFiles,
        portfolioPhotos,
      });
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(undefined);
    setProfileImageFile(null);
    onChangeInfo({
      profileImage: undefined,
      profileImageFile: null,
      portfolioFiles,
      portfolioPhotos,
    });
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = portfolioFiles.filter((_, i) => i !== index);
    setPortfolioFiles(updatedFiles);
    updateParent();
  };

  const handleRemovePortfolioImage = (index: number) => {
    const totalFiles = portfolioPhotos.length + portfolioFiles.length;
    if (totalFiles > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    const updatedPhotos = portfolioPhotos.filter((_, i) => i !== index);
    setPortfolioPhotos(updatedPhotos);
    updateParent();
  };

  const handlePortfolioFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalFiles =
      portfolioPhotos.length + portfolioFiles.length + selectedFiles.length;

    if (totalFiles > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    setPortfolioFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...selectedFiles];
      onChangeInfo({
        profileImage,
        profileImageFile,
        portfolioFiles: updatedFiles,
        portfolioPhotos,
      });
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
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </FormControl>
          <label
            htmlFor="profileImageInput"
            style={{ cursor: "pointer", color: "blue" }}
          >
            Choose Image
          </label>
          {(profileImageFile || profileImage) && (
            <div
              style={{
                position: "relative",
                width: "100px",
                marginTop: "10px",
              }}
            >
              <img
                src={
                  profileImageFile
                    ? URL.createObjectURL(profileImageFile)
                    : profileImage
                }
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
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={handlePortfolioFilesChange}
              />
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
            {portfolioPhotos.map((file: any, index: number) => (
              <div key={index} style={{ position: "relative", width: "100px" }}>
                <img
                  src={file.image}
                  alt={`Preview ${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemovePortfolioImage(index)}
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
            {portfolioFiles.map((file: any, index: number) => (
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
