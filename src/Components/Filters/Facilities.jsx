export function Facilities({facilities, setFacilities}) {
    return (
        <div className={"flex flex-col font-text gap-1 mt-2"}>
            <span className={"font-medium tracking-wider"}>Facilities</span>
            <div className={"grid grid-cols-2"}>
                <div className={"flex gap-2 cursor-pointer"}>
                    <input type="checkbox"
                           name="wifi"
                           value="wifi"
                           checked={facilities.includes("wifi")}
                           onChange={(e) => {
                               const {value, checked} = e.target;
                               setFacilities((prev) =>
                                   checked ? [...prev, value] : prev.filter((f) => f !== value)
                               );
                           }}
                           className={"w-4 cursor-pointer"}
                    />
                    <label htmlFor="wifi">Wi-Fi</label>
                </div>
                <div className={"flex gap-2 "}>
                    <input type="checkbox"
                           name="parking"
                           value="parking"
                           checked={facilities.includes("parking")}
                           onChange={(e) => {
                               const {value, checked} = e.target;
                               setFacilities((prev) =>
                                   checked ? [...prev, value] : prev.filter((f) => f !== value)
                               );
                           }}
                           className={"w-4 cursor-pointer"}
                    />
                    <label htmlFor="parking">Parking</label>
                </div>
                <div className={"flex gap-2 cursor-pointer"}>
                    <input type="checkbox"
                           name="breakfast"
                           value="breakfast"
                           checked={facilities.includes("breakfast")}
                           onChange={(e) => {
                               const {value, checked} = e.target;
                               setFacilities((prev) =>
                                   checked ? [...prev, value] : prev.filter((f) => f !== value)
                               );
                           }}
                           className={"w-4 cursor-pointer"}
                    />
                    <label htmlFor="breakfast">Breakfast</label>
                </div>
                <div className={"flex gap-2 cursor-pointer"}>
                    <input type="checkbox"
                           name="pets"
                           value="pets"
                           checked={facilities.includes("pets")}
                           onChange={(e) => {
                               const {value, checked} = e.target;
                               setFacilities((prev) =>
                                   checked ? [...prev, value] : prev.filter((f) => f !== value)
                               );
                           }}
                           className={"w-4 cursor-pointer"}
                    />
                    <label htmlFor="pets">Pets Allowed</label>
                </div>
            </div>
        </div>
    )
}