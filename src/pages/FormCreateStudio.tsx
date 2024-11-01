import { useState } from "react";
import GeneralInformacion from '../components/pages/FormCreateStudio/Generalinformation';

const FormCreateStudio = () => {
  const [studioName, setStudioName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [location, setLocation] = useState({
    city: "",
    state: "",
    country: "",
    address: "",
  });
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [numPhotographers, setNumPhotographers] = useState(1);
  const [photographers, setPhotographers] = useState([
    { firstName: "", lastName: "" },
  ]);

  const specialties = [
    { id: 1, name: "Wedding Photography" },
    { id: 2, name: "Product Photography" },
    { id: 3, name: "Portrait Photography" },
    { id: 4, name: "Event Photography" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImageFile(null);
  };

  const handlePortfolioFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalFiles = portfolioFiles.length + selectedFiles.length;

    if (totalFiles > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    setPortfolioFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setPortfolioFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  const handleSpecialtyChange = (id) => {
    setSelectedSpecialties((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((specialtyId) => specialtyId !== id)
        : [...prevSelected, id]
    );
  };

  const handleNumPhotographersChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumPhotographers(num);

    const updatedPhotographers = Array(num).fill({
      firstName: "",
      lastName: "",
    });
    setPhotographers(updatedPhotographers);
  };

  const handlePhotographerChange = (index, field, value) => {
    const updatedPhotographers = [...photographers];
    updatedPhotographers[index] = {
      ...updatedPhotographers[index],
      [field]: value,
    };
    setPhotographers(updatedPhotographers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studioData = {
      studioName,
      email,
      phone,
      description,
      signup: new Date().toISOString(),
      yearsOfExperience: parseInt(yearsOfExperience, 10),
      location,
      photographers,
      portfolioPhotos: [],
      studioSpecialties: selectedSpecialties.map((id) => ({
        specialty: { id },
      })),
    };

    const formData = new FormData();
    formData.append(
      "studio",
      new Blob([JSON.stringify(studioData)], { type: "application/json" })
    );
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }
    portfolioFiles.forEach((file) => {
      formData.append("portfolioImages", file);
    });

    try {
      const response = await fetch("http://localhost:8080/studios", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const savedStudio = await response.json();
        console.log("Studio saved successfully:", savedStudio);
      } else {
        console.error("Error saving studio:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="bg-[#454243]">
      <section className="container mx-auto py-10">
        <div className="max-w-screen-2xl space-y-10">
        <h1 className="text-[#D05858] font-bold text-5xl">Add photo studio</h1>

        <form onSubmit={handleSubmit} className="bg-[#DADADA] py-8 px-12 rounded-2xl">
          <GeneralInformacion />
          {/* <div>
            <label>Studio Name:</label>
            <input
              type="text"
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label>Years of Experience:</label>
            <input
              type="number"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              required
            />
          </div> */}

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>


          <div>
            <label>Location:</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={location.city}
              onChange={handleLocationChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={location.state}
              onChange={handleLocationChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={location.country}
              onChange={handleLocationChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={location.address}
              onChange={handleLocationChange}
              required
            />
          </div>




          <div>
            <label>Number of Photographers:</label>
            <select
              value={numPhotographers}
              onChange={handleNumPhotographersChange}
              required
            >
              {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {photographers.map((photographer, index) => (
            <div key={index}>
              <h4>Photographer {index + 1}</h4>
              <label>First Name:</label>
              <input
                type="text"
                value={photographer.firstName}
                onChange={(e) =>
                  handlePhotographerChange(index, "firstName", e.target.value)
                }
                required
              />
              <label>Last Name:</label>
              <input
                type="text"
                value={photographer.lastName}
                onChange={(e) =>
                  handlePhotographerChange(index, "lastName", e.target.value)
                }
                required
              />
            </div>
          ))}

          <div>
            <label>Specialties:</label>
            {specialties.map((specialty) => (
              <div key={specialty.id}>
                <input
                  type="checkbox"
                  value={specialty.id}
                  checked={selectedSpecialties.includes(specialty.id)}
                  onChange={() => handleSpecialtyChange(specialty.id)}
                />
                <label>{specialty.name}</label>
              </div>
            ))}
          </div>

          <div>
            <label>Profile Image:</label>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="profileImageInput"
            />
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
            <label>Portfolio Images (up to 10):</label>
            <input
              type="file"
              multiple
              onChange={handlePortfolioFilesChange}
              style={{ display: "none" }}
              id="portfolioImagesInput"
            />
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
                <div
                  key={index}
                  style={{ position: "relative", width: "100px" }}
                >
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

          <button type="submit">Submit</button>
        </form>
        </div>
      </section>
    </main>
  );
};

export default FormCreateStudio;
