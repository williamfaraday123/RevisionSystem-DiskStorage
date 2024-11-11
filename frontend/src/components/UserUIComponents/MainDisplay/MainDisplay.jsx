import LectureDisplay from "./LectureDisplay.jsx/LectureDisplay";
import PastYearPapersDisplay from "./PastYearPapersDisplay/PastYearPapersDisplay";
import TutorialDisplay from "./TutorialDisplay/TutorialDisplay";

const MainDisplay = ({ selectedFilters }) => {
    if (!selectedFilters) {
        return <div>empty</div>
    }
    switch (selectedFilters?.type) {
        case 'Lecture':
            return (
                <LectureDisplay selectedFilters={selectedFilters}/>
            );
            break;
        case 'Tutorial':
            return (
                <TutorialDisplay selectedFilters={selectedFilters}/>
            );
            break;
        case 'Past Year Papers':
            return (
                <PastYearPapersDisplay selectedFilters={selectedFilters}/>
            );
            break;
    }
};

export default MainDisplay;