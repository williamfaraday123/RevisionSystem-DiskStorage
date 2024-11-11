import { useState } from 'react';

const Frame = ({ selectedFilters, QuestionsOrSolutions }) => {
    const [isFileLoaded, setIsFileLoaded] = useState(true);

    const handleLoad = () => {
        setIsFileLoaded(true);
    };
    const handleError = () => {
        setIsFileLoaded(false);
    };

    let src = '';
    if (selectedFilters) {
        switch (selectedFilters?.['type']) {
            case 'Lecture':
                src = `/src/assets/${selectedFilters?.['course_code']}/${selectedFilters?.['type']}/${selectedFilters?.['chapter']}.pdf`;
                break;
            case 'Tutorial':
                src = `/src/assets/${selectedFilters?.['course_code']}/${selectedFilters?.['type']}/${QuestionsOrSolutions}/${selectedFilters?.['chapter']}.pdf`;
                break;
            case 'Past Year Papers':
                src = `/src/assets/${selectedFilters?.['course_code']}/${selectedFilters?.['type']}/${QuestionsOrSolutions}/${selectedFilters?.['course_code']} ${selectedFilters?.['year']} ${selectedFilters?.['semester']}.pdf`;
                break;
        } 
    }
    
    return(
        <>
            {isFileLoaded ? (
                <iframe
                    src={src}
                    frameBorder="0"
                    scrolling="auto"
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                    onLoad = {handleLoad}
                    onError = {handleError}
                ></iframe>
            ) : (
                <div>Not available</div>
            )}
        </>
    );
};

export default Frame;