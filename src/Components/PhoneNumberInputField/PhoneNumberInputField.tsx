import parsePhoneNumber from "libphonenumber-js";
import metadata from "libphonenumber-js/metadata.min.json";

export default function PhoneNumberInputField() {
  return (
    <div style={{ display: "flex" }}>
      <select></select>
      <input type="text" name="phone-no" />
    </div>
  );
}
