import Frame from "../Frame";

const PastYearPapersDisplay = ({ selectedFilters }) => {
    return(
        <div style={{
            flex: "1",
            width: "100vw",
            height: "100vh",
            display: "flex"
        }}>
            <div style={{
                flex: "1"
            }}>
                <Frame 
                    selectedFilters = {selectedFilters}
                    QuestionsOrSolutions = "Questions" 
                />
            </div>
            <div style={{
                flex: "1"
            }}>
                <Frame 
                    selectedFilters = {selectedFilters}
                    QuestionsOrSolutions = "Solutions" 
                />
            </div>
        </div>
    );
};

export default PastYearPapersDisplay;