import {Image} from "@nextui-org/react";
import PropTypes from 'prop-types';

export interface heroProps {
    src: string,
    alt: string,
    maxH?: number,
    maxW?: string,
}

const BlurredEdgeHero: React.FC<heroProps> = ({src, alt, maxH = 450, maxW = "6xl"}) => {
    const imageUrl = "/testHero.jpeg"

    return (
        <div className="flex flex-col max-w-6xl relative items-center overflow-hidden">
            <Image
                src={src}
                radius="none"
                alt={alt}
                className=""
                classNames={{
                    wrapper: "",
                    img: `z-10 max-h-[450px]`,
                }}
            />

            <div className={`absolute max-w-6xl w-screen rounded-3xl overflow-hidden`}>
                <div className="w-full overflow-hidden z-10 blur-3xl">
                    <img 
                        className="z-0"
                        src={imageUrl} 
                        style={{
                            width: "100%",
                            maxHeight: `450px`,
                            objectFit: "fill",
                            objectPosition: "center",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

BlurredEdgeHero.defaultProps = {
    maxH: 450,
    maxW: "6xl"
};

BlurredEdgeHero.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    maxH: PropTypes.number,
    maxW: PropTypes.string,
};

export default BlurredEdgeHero;