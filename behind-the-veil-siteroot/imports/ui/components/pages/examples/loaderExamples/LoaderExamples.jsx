import Loader1 from "react-spinners/BarLoader";
import Loader2 from "react-spinners/BeatLoader";
import Loader3 from "react-spinners/BounceLoader";
import Loader4 from "react-spinners/CircleLoader";
import Loader5 from "react-spinners/ClimbingBoxLoader";
import Loader6 from "react-spinners/ClipLoader";
import Loader7 from "react-spinners/ClockLoader";
import Loader8 from "react-spinners/DotLoader";
import Loader9 from "react-spinners/FadeLoader";
import Loader10 from "react-spinners/GridLoader";
import Loader11 from "react-spinners/HashLoader";
import Loader12 from "react-spinners/MoonLoader";
import Loader13 from "react-spinners/PacmanLoader";
import Loader14 from "react-spinners/PropagateLoader";
import Loader15 from "react-spinners/PuffLoader";
import Loader16 from "react-spinners/PulseLoader";
import Loader17 from "react-spinners/RingLoader";
import Loader18 from "react-spinners/RiseLoader";
import Loader19 from "react-spinners/RotateLoader";
import Loader20 from "react-spinners/ScaleLoader";
import Loader21 from "react-spinners/SyncLoader";

/**
 * File Description: Loader component
 * File version: 1.0
 * Contributors: Nikki
 */
import React from "react";
import Loader from "/imports/ui/components/loader/Loader";

/**
 * General loader component.
 */
const LoaderExamples = () => {
    return (<div className="flex flex-col gap-3">
        <div className="large-text underline">Example Loaders:</div>

        <div className="main-text underline">Our current loader:</div>
        <Loader
            loadingText={"any custom text here . . ."}
            isLoading={true}
            size={100}
            speed={1.5}
        />

        <div className="main-text underline">All Loader types (we should pick one/two):</div>
        <div className={"flex flex-row items-center justify-center flex-wrap gap-x-48 gap-y-32"}>
            <Loader1/>
            <Loader2/>
            <div className={"flex flex-col items-center justify-center"}>
                <Loader3/>
                <div className={"w-56"}>
                    used for service page loading
                </div>
            </div>
            <Loader4/>
            <Loader5/>
            <Loader6/>
            <Loader7/>
            <Loader8/>
            <Loader9/>
            <Loader10/>
            <Loader11/>
            <Loader12/>
            <Loader13/>
            <Loader14/>
            <Loader15/>
            <Loader16/>
            <Loader17/>
            <Loader18/>
            <Loader19/>
            <Loader20/>
            <Loader21/>
        </div>
    </div>);
};

export default LoaderExamples;
