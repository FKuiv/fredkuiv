<script lang="ts">
	import { T } from '@threlte/core';
	import {
		Vector3,
		BufferGeometry,
		type NormalBufferAttributes,
		CatmullRomCurve3,
		Plane,
		PlaneHelper
	} from 'three';
	import { animationScripts, scrollPercent } from '$lib/store';
	import { scrollSections } from '$lib/helpers/AnimationScrollSections';
	import { lerp, scalePercent } from '$lib/helpers/ThreeScroll';
	import { getArrayCenter } from '$lib/helpers/calculateLineCenter';

	let geometry: BufferGeometry<NormalBufferAttributes>;
	const pathDivisions = 40;
	let points: Vector3[] = [new Vector3(0, 0, 0), new Vector3(0, 0, 0)];
	let path: CatmullRomCurve3 = new CatmullRomCurve3(points);

	let clippingPlane = new Plane(new Vector3(0, -1, 0), 0);

	animationScripts.update((currentValue) => {
		currentValue.push({
			section: scrollSections[1.5],
			func: () => {
				const scalePercentFunction = scalePercent(
					scrollSections[1.5].start,
					scrollSections[1.5].end,
					$scrollPercent
				);
				points = [
					new Vector3(0, 2, 0),
					new Vector3(0, 2, lerp(0, 30, scalePercentFunction)),
					new Vector3(10, 2, 50)
				];
			},
			clearFunc: () => {
				if ($scrollPercent < scrollSections[1.5].start) {
					points = [new Vector3(0, 0, 0), new Vector3(0, 0, 0)];
				}
			}
		});

		currentValue.push({
			section: scrollSections[2],
			func: () => {
				const scalePercentFunction = scalePercent(
					scrollSections[2].start,
					scrollSections[2].end,
					$scrollPercent
				);
				points = [
					new Vector3(lerp(0, 50, scalePercentFunction), lerp(2, -2, scalePercentFunction), 0),
					new Vector3(0, lerp(2, 10, scalePercentFunction), lerp(50, 30, scalePercentFunction)),
					new Vector3(lerp(0, 50, scalePercentFunction), -30, lerp(0, -500, scalePercentFunction))
				];
			},
			clearFunc: () => {}
		});

		currentValue.push({
			section: scrollSections[3],
			func: () => {
				const scalePercentFunction = scalePercent(
					scrollSections[3].start,
					scrollSections[3].end,
					$scrollPercent
				);
				const currentPlanePos = lerp(0, 1, scalePercentFunction);
				const point = path.getPoint(currentPlanePos);
				const tangent = path.getTangent(currentPlanePos).negate();
				clippingPlane.setFromNormalAndCoplanarPoint(tangent, point);
			},
			clearFunc: () => {}
		});

		return currentValue;
	});

	$: {
		path = new CatmullRomCurve3(points);
		geometry = new BufferGeometry().setFromPoints(path.getPoints(pathDivisions));
	}
</script>

<T.Line {geometry} position={getArrayCenter(points[0], points[1], true)}>
	<T.LineBasicMaterial color={'gray'} />
</T.Line>

<T.Line {geometry} position={getArrayCenter(points[0], points[1], true)}>
	<T.LineBasicMaterial clippingPlanes={[clippingPlane]} color={'red'} />
</T.Line>

<T.PlaneHelper plane={clippingPlane} size={10} />
