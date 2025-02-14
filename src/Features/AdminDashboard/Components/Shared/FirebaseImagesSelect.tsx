import { Box, Typography } from "@mui/material";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { required, SelectInput, useRecordContext } from "react-admin";

interface FirebaseImagesSelectProps {
  collection: string;
  source: string;
}
export function FirebaseImagesSelect({
  collection,
  source,
}: FirebaseImagesSelectProps) {
  const [imageOptions, setImageOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function fetchImages() {
    const storageRef = ref(getStorage(), collection);
    const result = await listAll(storageRef);
    const urls = await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { id: url, name: item.name };
      })
    );
    setImageOptions(urls);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  const record = useRecordContext();
  useEffect(() => {
    if (record) setSelectedImage(record[source]);
  }, [record]);

  return (
    <>
      <SelectInput
        validate={[required()]}
        source={source}
        choices={imageOptions}
        optionText="name"
        optionValue="id"
        label="Preview Image"
        onChange={(e) => setSelectedImage(e.target.value)}
      />
      {/* Show Selected Image */}
      {selectedImage && (
        <Box mt={2}>
          <Typography variant="subtitle1">Selected Image:</Typography>
          <img
            src={selectedImage}
            alt="Preview"
            style={{ width: "200px", borderRadius: "8px", marginTop: "8px" }}
          />
        </Box>
      )}
    </>
  );
}
