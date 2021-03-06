import assert from 'assert';
import sinon from 'sinon';
import simulant from 'simulant';
import fn from '../index';

let elements = {};

before(function() {
	window.fixture.load('/test/fixtures/index.html');
	elements = {
		jackie: document.querySelector('#jackie'),
		frankie: document.querySelector('#frankie'),
		sally: document.querySelector('#sally'),
		moose: document.querySelector('#moose'),
		finn: document.querySelector('#finn'),
		baby: document.querySelector('#baby')
	};
});

after(function() {
	window.fixture.cleanup();
});

it('should handle delegated event', function() {
	const { jackie, frankie, sally, moose } = elements;

	const callback = sinon.spy();
	const listener = fn('#frankie', callback);

	jackie.addEventListener('click', listener);

	simulant.fire(jackie, 'click');
	simulant.fire(frankie, 'click');
	simulant.fire(frankie, 'click');
	simulant.fire(sally, 'click');
	simulant.fire(moose, 'click');

	const [event] = callback.firstCall.args;

	assert.equal(callback.called, true);
	assert.equal(callback.callCount, 3);
	assert.equal(event.delegateTarget, frankie);

	jackie.removeEventListener('click', listener);
});

it('should handle unbounded delegated event', function() {
	const { jackie, frankie, sally, moose } = elements;

	const callback = sinon.spy();
	const listener = fn('#frankie', callback);

	jackie.addEventListener('click', listener);
	jackie.removeEventListener('click', listener);

	simulant.fire(jackie, 'click');
	simulant.fire(frankie, 'click');
	simulant.fire(sally, 'click');
	simulant.fire(moose, 'click');

	assert.equal(callback.called, false);
	assert.equal(callback.callCount, 0);
});

it('shouldn’t trigger delegated event if target is inside disabled element', function() {
	const { finn, baby } = elements;

	const callback = sinon.spy();
	const listener = fn('#baby', callback);

	finn.addEventListener('click', listener);

	finn.disabled = true;

	simulant.fire(baby, 'click');
	simulant.fire(baby, 'click');
	simulant.fire(baby, 'click');

	finn.disabled = false;

	simulant.fire(baby, 'click');

	assert.equal(callback.called, true);
	assert.equal(callback.callCount, 1);

	finn.removeEventListener('click', listener);
});
