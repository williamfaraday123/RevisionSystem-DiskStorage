import Frame from "../Frame";

const LectureDisplay = ({ selectedFilters }) => {
    return(
        <div style={{
            flex: "1",
            width: "100vw",
            height: "100vh",
            display: "flex"
        }}>
            <Frame selectedFilters = {selectedFilters} />
        </div>
    );
};

export default LectureDisplay;