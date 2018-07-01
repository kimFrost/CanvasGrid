"use strict";

/******************************************************
 ************** Simple ES6 Vector Class  **************
 ******************************************************
 * Author: Starbeamrainbowlabs
 * Twitter: @SBRLabs
 * Email: feedback at starbeamrainbowlabs dot com
 * 
 * From https://gist.github.com/sbrl/69a8fa588865cacef9c0
 ******************************************************
 * Originally written for my 2D Graphics ACW at Hull
 * University.
 ******************************************************
 * Changelog
 ******************************************************
 * 19th December 2015:
	* Added this changelog.
 * 28th December 2015:
	* Rewrite tests with klud.js + Node.js
 * 30th January 2016:
	* Tweak angleFrom function to make it work properly.
 * 31st January 2016:
	* Add the moveTowards function.
	* Add the minComponent getter.
	* Add the maxComponent getter.
	* Add the equalTo function.
	* Tests still need to be written for all of the above.
 * 19th September 2016:
	* Added Vector support to the multiply method.
 * 10th June 2017:
	* Fixed a grammatical mistake in a comment.
	* Added Vector.fromBearing static method.
 * 21st October 2017:
 	* Converted to ES6 module.
 	* Added Vector.zero and Vector.one constants. Remember to clone them!
 * 23rd November 2017:
 	* Added distanceTo(otherPoint)
 	* Fix typo in comment
 */

class Vector {
	x: number;
	y: number;
	//onChange: EventEmitter
	//readonly zero: Vector;
	//readonly one: Vector;
	// Constructor
	constructor(inX = 0, inY = 0) {
		if (typeof inX != "number")
			throw new Error("Invalid x value.");
		if (typeof inY != "number")
			throw new Error("Invalid y value.");

		// Store the (x, y) coordinates
		this.x = inX;
		this.y = inY;
		//this.zero = new Vector(0, 0);
		//this.one = new Vector(1, 1);
	}

	set(x: number, y:number) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Add another vector to this vector.
	 * @param {Vector} v The vector to add.
	 * @return {Vector}   The current vector. useful for daisy-chaining calls.
	 */
	static add(v: Vector, av: Vector): Vector {
		v = v.clone();
		v.x += av.x;
		v.y += av.y;

		return v;
	}
	add(av: Vector): Vector {
		return Vector.add(this, av);
	}

	/**
	 * Take another vector from this vector.
	 * @param  {Vector} v The vector to subtract from this one.
	 * @return {Vector}   The current vector. useful for daisy-chaining calls.
	 */
	static subtract(v: Vector, sv: Vector): Vector {
		v = v.clone();
		v.x -= sv.x;
		v.y -= sv.y;
		return v;
	}
	subtract(sv: Vector): Vector {
		return Vector.subtract(this, sv);
	}

	/**
	 * Divide the current vector by a given value.
	 * @param  {number} value The value to divide by.
	 * @return {Vector}	   The current vector. Useful for daisy-chaining calls.
	 */
	static divide(v: Vector, value: number): Vector {
		v = v.clone();
		if (typeof value != "number")
			throw new Error("Can't divide by non-number value.");

		v.x /= value;
		v.y /= value;

		return v;
	}
	divide(value: number): Vector {
		return Vector.divide(this, value);
	}


	/**
	 * Multiply the current vector by a given value.
	 * @param  {(number|Vector)} value The number (or Vector) to multiply the current vector by.
	 * @return {Vector}	   The current vector. useful for daisy-chaining calls.
	 */
	static multiply(v: Vector, value: Vector | number): Vector {
		v = v.clone(); // Prevent mutation of original vector
		if (value instanceof Vector) {
			v.x *= value.x;
			v.y *= value.y;
		}
		else if (typeof value == "number") {
			v.x *= value;
			v.y *= value;
		}
		else
			throw new Error("Can't multiply by non-number value.");

		return v;
	}
	multiply(value: Vector | number): Vector {
		return Vector.multiply(this, value);
	}


	/*
	v = Vector.rotate(v, 5);
	v = v.rotate(5);

	vs

	Vector.rotate(v, 5);
	v.rotate(5);

	vs

	v = Vector.rotate(v, 5);
	v.rotate(5);
	*/



	/**
	 * Returns the distance from this point to another point.
	 * @param  {Vector} otherPoint The point to find the distance to.
	 * @return {Vector}            The vector distance to the other point.
	 */
	static distanceTo(v: Vector, otherPoint: Vector): Vector {
		v = v.clone();
		return otherPoint.clone().subtract(v);
	}
	distanceTo(otherPoint: Vector): Vector {
		return Vector.distanceTo(this, otherPoint);
	}

	/**
	 * Move the vector towards the given vector by the given amount.
	 * @param  {Vector} v      The vector to move towards.
	 * @param  {number} amount The distance to move towards the given vector.
	 */
	moveTowards(v: Vector, amount: number) {
		// From http://stackoverflow.com/a/2625107/1460422
		var dir = new Vector(
			v.x - this.x,
			v.y - this.y
		).limitTo(amount);
		this.x += dir.x;
		this.y += dir.y;

		return this;
	}

	/**
	 * Limit the length of the current vector to value without changing the
	 * direction in which the vector is pointing.
	 * @param  {number} value The number to limit the current vector's length to.
	 * @return {Vector}	   The current vector. useful for daisy-chaining calls.
	 */
	limitTo(value: number) {
		if (typeof value != "number")
			throw new Error("Can't limit to non-number value.");

		this.divide(this.length);
		this.multiply(value);

		return this;
	}

	/**
	 * Return the dot product of the current vector and another vector.
	 * @param  {Vector} v   The other vector we should calculate the dot product with.
	 * @return {Vector}	 The current vector. Useful for daisy-chaining calls.
	 */
	dotProduct(v: Vector) {
		return (this.x * v.x) + (this.y * v.y);
	}

	/**
	 * Calculate the angle, in radians, from north to another vector.
	 * @param  {Vector} v The other vector to which to calculate the angle.
	 * @return {Vector}	 The current vector. useful for daisy-chaining calls.
	 */
	angleFrom(v: Vector) {
		// From http://stackoverflow.com/a/16340752/1460422
		var angle = Math.atan2(v.y - this.y, v.x - this.x) - (Math.PI / 2);
		angle += Math.PI / 2;
		if (angle < 0) angle += Math.PI * 2;
		return angle;
	}

	/**
	 * Clones the current vector.
	 * @return {Vector} A clone of the current vector. Very useful for passing around copies of a vector if you don't want the original to be altered.
	 */
	clone() {
		return new Vector(this.x, this.y);
	}

	/*
	 * Returns a representation of the current vector as a string.
	 * @returns {string} A representation of the current vector as a string.
	 */
	toString() {
		return `(${this.x}, ${this.y})`;
	}

	/**
	 * Whether the vector is equal to another vector.
	 * @param  {Vector} v The vector to compare to.
	 * @return {boolean}  Whether the current vector is equal to the given vector.
	 */
	equalTo(v) {
		if (this.x == v.x && this.y == v.y)
			return true;
		else
			return false;
	}

	/**
	 * Get the unit vector of the current vector - that is a vector poiting in the same direction with a length of 1. Note that this does *not* alter the original vector.
	 * @return {Vector} The current vector's unit form.
	 */
	get unitVector() {
		var length = this.length;
		return new Vector(
			this.x / length,
			this.y / length);
	}

	/**
	 * Get the length of the current vector.
	 * @return {number} The length of the current vector.
	 */
	get length() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}

	/**
	 * Get the value of the minimum component of the vector.
	 * @return {number} The minimum component of the vector.
	 */
	get minComponent() {
		return Math.min(this.x, this.y);
	}

	/**
	 * Get the value of the maximum component of the vector.
	 * @return {number} The maximum component of the vector.
	 */
	get maxComponent() {
		return Math.min(this.x, this.y);
	}

	/**
	 * Returns a new vector based on an angle and a length.
	 * @param	{number}	angle	The angle, in radians.
	 * @param	{number}	length	The length.
	 * @return	{Vector}	A new vector that represents the (x, y) of the specified angle and length.
	 */
	static fromBearing(angle: number, length: number) {
		return new Vector(
			length * Math.cos(angle),
			length * Math.sin(angle)
		);
	}

	static rotate(v: Vector, degrees: number): Vector {
		v = v.clone(); // Prevent mutation of original vector
		let radians = degrees * (Math.PI / 180)
		var cos = Math.cos(radians);
		var sin = Math.sin(radians);
		let x = v.x;
		let y = v.y;
		v.x = Math.round(10000 * (x * cos - y * sin)) / 10000;
		v.y = Math.round(10000 * (x * sin + y * cos)) / 10000;
		return v;
	}
	rotate(degrees: number): Vector {
		return Vector.rotate(this, degrees);
	}

	static floor(v: Vector, numOfDecimals = 0): Vector {
		v = v.clone();
		var power = Math.pow(10, numOfDecimals);
		v.x = Math.floor(power * v.x) / power;
		v.y = Math.floor(power * v.y) / power;
		return v;
	}
	floor(numOfDecimals = 0): Vector {
		return Vector.floor(this, numOfDecimals);
	}

	
}


var rotateVector = function(vec, ang)
{
    let radian = ang * (Math.PI / 180);
    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    return new Array(
      Math.round(10000 * (vec[0] * cos - vec[1] * sin)) / 10000, 
      Math.round(10000 * (vec[0] * sin + vec[1] * cos)) / 10000
    );
};


export default Vector;