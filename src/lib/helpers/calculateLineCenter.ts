import { Vector3 } from 'three';

function calculateLineCenter(pointA: Vector3, pointB: Vector3) {
	// Assuming pointA and pointB are instances of THREE.Vector3
	const centerX = (pointA.x + pointB.x) / 2;
	const centerY = (pointA.y + pointB.y) / 2;
	const centerZ = (pointA.z + pointB.z) / 2;

	return { x: centerX, y: centerY, z: centerZ };
}

export function getVectorCenter(pointA: Vector3, pointB: Vector3): Vector3 {
	const { x, y, z } = calculateLineCenter(pointA, pointB);
	return new Vector3(x, y, z);
}

export function getArrayCenter(
	pointA: Vector3,
	pointB: Vector3,
	excludeY = false
): [x: number, y: number, z: number] {
	const { x, y, z } = calculateLineCenter(pointA, pointB);
	if (excludeY) {
		return [-x, pointA.y, -z];
	} else {
		return [x, y, z];
	}
}
