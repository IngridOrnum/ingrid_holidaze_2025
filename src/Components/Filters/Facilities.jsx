export function Facilities ({ facilities, setFacilities }) {
    return (
        <div>
            <span>Facilities</span>
            <div>
                <input type="checkbox"
                       name="wifi"
                       value="wifi"
                       checked={facilities.includes("wifi")}
                       onChange={(e) => {
                           const { value, checked } = e.target;
                           setFacilities((prev) =>
                               checked ? [...prev, value] : prev.filter((f) => f !== value)
                           );
                       }}
                />
                <label htmlFor="wifi">Wi-Fi</label>
                <input type="checkbox"
                       name="parking"
                       value="parking"
                       checked={facilities.includes("parking")}
                       onChange={(e) => {
                           const { value, checked } = e.target;
                           setFacilities((prev) =>
                               checked ? [...prev, value] : prev.filter((f) => f !== value)
                           );
                       }}
                />
                <label htmlFor="parking">Parking</label>
                <input type="checkbox"
                       name="breakfast"
                       value="breakfast"
                       checked={facilities.includes("breakfast")}
                       onChange={(e) => {
                           const { value, checked } = e.target;
                           setFacilities((prev) =>
                               checked ? [...prev, value] : prev.filter((f) => f !== value)
                           );
                       }}
                />
                <label htmlFor="breakfast">Breakfast</label>
                <input type="checkbox"
                       name="pets"
                       value="pets"
                       checked={facilities.includes("pets")}
                       onChange={(e) => {
                           const { value, checked } = e.target;
                           setFacilities((prev) =>
                               checked ? [...prev, value] : prev.filter((f) => f !== value)
                           );
                       }}
                />
                <label htmlFor="pets">Pets Allowed</label>
            </div>
        </div>
    )
}