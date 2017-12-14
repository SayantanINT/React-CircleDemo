import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text
} from 'react-native';
import OrbitGenerater from "./OrbitGenerater";


import Svg, {
    Circle, G
} from 'react-native-svg';
import Planets from "./Planets";

const {width, height} = Dimensions.get("window");

let x;
let y;
let scx,
    scy,
    scxG,
    scyG,
    r,
    dradius,
    average,
    radius,
    outerCirclewidth,
    noOfCircle;
let degreeArray = [30];
let degreeArray2 = [40];
let mainCount = 0;
let counter = 0;
export default class Orbit extends Component<{}> {


    componentWillMount() {

        scxG = width / 2;
        scx = scxG.toString();
        scyG = height / 2;
        scy = scyG.toString();
        r = scxG;
        radius = r.toString();
        noOfCircle = 2;
        outerCirclewidth = r * 2;

    }




    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //
    //     };
    // }
    setNativeProps = (nativeProps) => {
        this._root.setNativeProps(nativeProps);
    }


    render() {

        // alert(scx+","+scy)
        return (
            <View style={styles.container}>

                <View style={styles.svgStyle}>

                    {this.generateOrbitPath(r, noOfCircle)}

                </View>

            </View>

        );
    }

    generateOrbitPath(radius, noOfCircle) {
        average = r / noOfCircle;

        let orbitArray = []


        for (i = 1; i <= noOfCircle; i++) {
            counter++
            if (i == 1) {

                // alert(x+" "+y)
                dradius = radius.toString()
                // alert(dradius)
                //
                orbitArray.push(
                    <View key={i} style={styles.box1}>

                        {/*<Planets*/}
                        {/*keyId={i}*/}
                        {/*cy={scyG}*/}
                        {/*cx={scxG}*/}
                        {/*radius={radius}*/}
                        {/*degree={degreeArray[0]}/>*/}

                        {this.planetGenerator(radius, i, degreeArray2)}
                        <Svg style={{flex: 1}}>


                            <OrbitGenerater
                                radius={dradius}
                                scx={scx}
                                scy={scy}

                            />
                        </Svg>
                    </View>
                )
            }

            else {

                radius = radius - average
                dradius = radius.toString()
                orbitArray.push(
                    <View key={i} style={styles.box1}>


                        {this.planetGenerator(radius, i, degreeArray)}

                        {/*<Planets*/}
                        {/*count={1}*/}
                        {/*keyId={i}*/}
                        {/*cy={scyG}*/}
                        {/*cx={scxG}*/}
                        {/*radius={radius}*/}
                        {/*degree={90}/>*/}

                        <Svg style={{flex: 1}}>


                            <OrbitGenerater
                                radius={dradius}
                                scx={scx}
                                scy={scy}

                            />
                        </Svg>
                    </View>
                )

            }
        }

        return (orbitArray)


    }

    plotPoint(cx, cy, r, degree) {

        x = cx + r * Math.cos(degToRad(degree)) - 10
        y = cy + r * Math.sin(degToRad(degree)) - 10
    }


    planetGenerator(radius, i, deg) {
        let planetArray = [];

        //
        for (let j = 0; j < deg.length; j++) {
            counter++
            planetArray.push(
                <Planets
                    totOrbitCount={noOfCircle}
                    orbitId={i}
                    keyId={j}
                    cy={scyG}
                    cx={scxG}
                    radius={radius}
                    degree={deg[j]}/>
            )
        }

        return (planetArray);
    }
}

function degToRad(deg) {
    return deg * Math.PI / 180;
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
    },
    svgStyle: {
        width: width,
        height: height,

    },
    symbol: {
        height: 20,
        width: 20,
        backgroundColor: 'black',
        borderRadius: 10,
        position: 'absolute',

    },
    box1: {

        justifyContent: 'center',
        //top: 40,
        //left: 40,
        position: 'absolute',
        width: width,
        height: height,
    },


});
