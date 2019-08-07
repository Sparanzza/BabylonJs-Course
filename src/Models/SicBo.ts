import { Loader } from "../Loader";
import * as BABYLON from "babylonjs";

export class SicBo extends Loader {
    public dices: BABYLON.Mesh;
    public lastGameResult = {
        value0: 1,
        value1: 1,
        value2: 1
    };
    public dicesCenterXYZ: BABYLON.Vector3;
    public sector1: BABYLON.PolygonMeshBuilder;

    constructor(public path: string, public file: string, scene: BABYLON.Scene) {
        super(path, file);
    }

    setDicesFacesResult(n0: number, n1: number, n2: number) {
        // init Keyframe
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_0", this.getMesh("SELECT_FACE_0").rotationQuaternion, 0);
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_1", this.getMesh("SELECT_FACE_1").rotationQuaternion, 0);
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_2", this.getMesh("SELECT_FACE_2").rotationQuaternion, 0);

        // last Keyframe
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_0", this.convertFacesToQuaternion(n0), 1);
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_1", this.convertFacesToQuaternion(n1), 1);
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_2", this.convertFacesToQuaternion(n2), 1);
        this.lastGameResult.value0 = n0;
        this.lastGameResult.value1 = n1;
        this.lastGameResult.value2 = n2;
    }

    convertFacesToQuaternion(n: number): BABYLON.Quaternion {
        let v3: BABYLON.Vector3;
        switch (n) {
            case 1:
                v3 = new BABYLON.Vector3(0, 0, 0);
                break;
            case 2:
                v3 = new BABYLON.Vector3(Math.PI, 0, 0);
                break;
            case 3:
                v3 = new BABYLON.Vector3(Math.PI / 2, 0, 0);
                break;
            case 4:
                v3 = new BABYLON.Vector3(-Math.PI / 2, 0, 0);
                break;
            case 5:
                v3 = new BABYLON.Vector3(0, 0, (-Math.PI * 3) / 2);
                break;
            case 6:
                v3 = new BABYLON.Vector3(0, 0, -Math.PI / 2);
                break;
            default:
                v3 = new BABYLON.Vector3(0, 0, 0);
                break;
        }
        return BABYLON.Quaternion.FromEulerAngles(v3.x, BABYLON.Scalar.RandomRange(0, 2 * Math.PI), v3.z);
    }

    // https://doc.babylonjs.com/snippets/innermeshpoints
    getRandPointFromSector(sector: BABYLON.AbstractMesh, scene: BABYLON.Scene): BABYLON.Vector3[] {
        let boundInfo = sector.getBoundingInfo();
        let diameter = 2 * boundInfo.boundingSphere.radius;
        sector.updateFacetData();

        let positions = <BABYLON.IndicesArray>sector.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        let indices = <BABYLON.IndicesArray>sector.getIndices();

        let point = BABYLON.Vector3.Zero();
        let points = [];
        let directions = [];

        let randX = 0;
        let randY = 0;
        let randZ = 0;

        let index = 0;
        let id0 = 0;
        let id1 = 0;
        let id2 = 0;
        let v0X = 0;
        let v0Y = 0;
        let v0Z = 0;
        let v1X = 0;
        let v1Y = 0;
        let v1Z = 0;
        let v2X = 0;
        let v2Y = 0;
        let v2Z = 0;

        let vertex0 = BABYLON.Vector3.Zero();
        let vertex1 = BABYLON.Vector3.Zero();
        let vertex2 = BABYLON.Vector3.Zero();
        let vec0 = BABYLON.Vector3.Zero();
        let vec1 = BABYLON.Vector3.Zero();

        let lamda = 0;
        let mu = 0;
        let norm = BABYLON.Vector3.Zero();
        let tang = BABYLON.Vector3.Zero();
        let biNorm = BABYLON.Vector3.Zero();
        let angle = 0;
        let facetPlaneVec = BABYLON.Vector3.Zero();

        let gap = 0;
        let distance = 0;
        let ray = new BABYLON.Ray(BABYLON.Vector3.Zero(), BABYLON.Axis.X);
        let pickInfo;
        let facetPoint = BABYLON.Vector3.Zero();
        let direction = BABYLON.Vector3.Zero();
        let particleDirection = BABYLON.Vector3.Zero();
        let particleDistance = 0;
        let testPoint = BABYLON.Vector3.Zero();

        for (let p = 0; p < 1; p++) {
            index = Math.floor(BABYLON.Scalar.RandomRange(0, indices.length / 3));
            id0 = indices[3 * index];
            id1 = indices[3 * index + 1];
            id2 = indices[3 * index + 2];
            v0X = positions[3 * id0];
            v0Y = positions[3 * id0 + 1];
            v0Z = positions[3 * id0 + 2];
            v1X = positions[3 * id1];
            v1Y = positions[3 * id1 + 1];
            v1Z = positions[3 * id1 + 2];
            v2X = positions[3 * id2];
            v2Y = positions[3 * id2 + 1];
            v2Z = positions[3 * id2 + 2];
            vertex0.set(v0X, v0Y, v0Z);
            vertex1.set(v1X, v1Y, v1Z);
            vertex2.set(v2X, v2Y, v2Z);
            vertex1.subtractToRef(vertex0, vec0);
            vertex2.subtractToRef(vertex1, vec1);

            norm = sector
                .getFacetNormal(index)
                .normalize()
                .scale(-1);
            tang = vec0.clone().normalize();
            biNorm = BABYLON.Vector3.Cross(norm, tang);
            angle = BABYLON.Scalar.RandomRange(0, 2 * Math.PI);
            facetPlaneVec = tang.scale(Math.cos(angle)).add(biNorm.scale(Math.sin(angle)));
            angle = BABYLON.Scalar.RandomRange(20, Math.PI);
            direction = facetPlaneVec.scale(Math.cos(angle)).add(norm.scale(Math.sin(angle)));

            //form a point inside the facet v0, v1, v2;
            lamda = BABYLON.Scalar.RandomRange(100, 1000);
            mu = BABYLON.Scalar.RandomRange(100, 1000);
            facetPoint = vertex0.add(vec0.scale(lamda)).add(vec1.scale(lamda * mu));

            gap = 0;
            distance = 0;
            pickInfo;
            ray.origin = facetPoint;
            ray.direction = direction;
            ray.length = diameter;
            pickInfo = ray.intersectsMesh(sector);
            console.log(pickInfo);
            if (pickInfo.hit) {
                distance = (<BABYLON.Vector3>pickInfo.pickedPoint).subtract(facetPoint).length();
                gap = BABYLON.Scalar.RandomRange(0, 1) * distance;
                point = facetPoint.add(direction.scale(gap));
                console.log(positions);
                console.log(indices);
            } else {
                point.set(0, 0, 0);
            }
            points.push(point);
        }
        console.log("points");
        console.log(points);
        return points;
    }
}
