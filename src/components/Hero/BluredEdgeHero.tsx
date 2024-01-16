import Image from "@/components/ClientImage"
import PropTypes from 'prop-types';

export interface heroProps {
    src: string,
    alt: string,
    maxH?: number,
    maxW?: string,
}

const BlurredEdgeHero: React.FC<heroProps> = ({src, alt, maxH = 450, maxW = "6xl"}) => {

    return (
        <div className="flex flex-col w-full relative items-center overflow-hidden">
            <Image
                src={src}
                radius="none"
                alt={alt}
                // className=""
                classNames={{
                    wrapper: "overflow-hidden ",
                    img: `z-10 max-h-[500px] min-h-[450]`,
                }}
            />

            <div className={`absolute max-w-7xl w-full rounded-3xl h-[500px] min-h-[450] overflow-hidden`}>
                <div className="w-full overflow-hidden blur-3xl">
                    <img 
                        className={""}
                        src={src} 
                        style={{
                            width: "100%",
                            maxHeight: `500px`,
                            minHeight: `450px`,
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