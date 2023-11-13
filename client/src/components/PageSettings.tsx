import { FC, useState } from "react";

type PageSettingsType = {
    numBoxesSide: number;
    setNumBoxesSide: React.Dispatch<React.SetStateAction<number>>;
    numBoxesMain: number;
    setNumBoxesMain: React.Dispatch<React.SetStateAction<number>>
};

const PageSettings: FC<PageSettingsType> = ({numBoxesSide, setNumBoxesSide, numBoxesMain, setNumBoxesMain}) => {
    const [showeSettings, setShoweSettings] = useState<boolean>(false);
    return (
        <div
            className="settings"
            onMouseEnter={() => setShoweSettings(true)}
            onMouseLeave={() => setShoweSettings(false)}>
            <div>Settings</div>
            {showeSettings &&
                <>
                    <input
                        type="number"
                        value={numBoxesSide}
                        onChange={(e) => setNumBoxesSide(+e.target.value)}
                        min="1"
                        max="10"
                    />
                    <input
                        type="number"
                        value={numBoxesMain}
                        onChange={(e) => setNumBoxesMain(+e.target.value)}
                        min="1"
                        max="10"
                    />
                </>
            }
        </div>
    );
};

export default PageSettings;