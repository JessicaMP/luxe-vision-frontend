import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { useEffect, useState } from "react";
// import { addFeature } from "@/reducers/featuresReducer.ts";
// import { useDispatch } from "react-redux";

const ModalAddFeature = ({ open, setOpen, onSave, isEdit, feature }: any) => {
  // const dispatch = useDispatch();
  const initialForm = {
    icon: "",
    featureName: "",
  };
  const [form, setForm] = useState({ ...initialForm });

  const handleProperty = (value: any, property: string) => {
    const updatedForm = { ...form, [property]: value };
    setForm(updatedForm);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    onSave(form)
    // console.log({ form });

    // try {
    //   const resultAction = await dispatch(addFeature(form));
    //   if (addFeature.fulfilled.match(resultAction)) {
    //     const { featureName } = resultAction.payload;
    //     console.log({ featureName });
    //     toast({
    //       title: "Duplicate study name",
    //       description: "Cannot add duplicate study name",
    //       variant: "",
    //     });
    //     setOpen(false);
    //   }
    // } catch (err) {
    //   console.log("Error: ", err);
    // }
  };

  useEffect(() => {
    if(isEdit === true) {
      setForm(feature)


      return
    }
    setForm(initialForm)
  }, [feature, isEdit])
  console.log({ form });

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: "600px",
          borderRadius: "md",
          p: 6,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <div className="space-y-5">
          <h2 className="text-[#D05858] font-bold text-2xl">{isEdit ? "Edit" : "New"} Feature</h2>
          <form onSubmit={onSubmit} className="space-y-5">
            <FormControl>
              <FormLabel>Icon:</FormLabel>
              <Input
                value={form.icon}
                onChange={(e) => handleProperty(e.target.value, "icon")}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Feature Name:</FormLabel>
              <Input
                value={form.featureName}
                onChange={(e) => handleProperty(e.target.value, "featureName")}
                required
              />
            </FormControl>
            <Button type="submit" color="danger">
              Submit
            </Button>
          </form>
        </div>
      </Sheet>
    </Modal>
  );
};

export default ModalAddFeature;
