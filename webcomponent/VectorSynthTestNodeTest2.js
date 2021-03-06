#! /usr/bin/env node
// Copyright (c) 2017 The WASM Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of mad chops coder AU nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

"use strict;"

let libVS = require('./libVSNode.js');
libVS().then((mod)=>{
  libVS = mod;
  let vs = new libVS.VectorSynth;

  vs.addFreq(400.)
  vs.setTime(4.)
  vs.setRange(24.)

  vs.addFreqRange(10., 304.)
  vs.addFreqPoint(100., 104.)
  vs.addFreqPoint(120., 114.)
  vs.addFreqPoint(130., 114.)
  vs.addFreqPoint(406., 332.)

  let vol=10; // this works
  vol=100; // this fails
  vs.addVolPoint(99., vol)
  vs.addVolPoint(405., vol)

  vs.addWavRange(10., 340.)
  vs.addWavPoint(126.5, 234.)
  vs.addWavPoint(256.5, 75.)
  vs.addWavPoint(336.5, 295.)
  vs.addWavPoint(423.5, 215.)

  let ret;
  if ((ret=vs.process())!=0)
    return ret;
  if ((ret=vs.generateSynth())<0)
    return ret;

  vs.goChangeOver();

  console.log("\n\nWARNING : libsndfile not detected on your system at build time, not saving the wavfile\n\n");

  let N=vs.getN();
  console.log('N='+N);
  let audio=[];
  for (let n=0; n<N; n++)
    audio.push(vs.getSample(n)); // this is the audio sample at index n
  console.log(audio)
});
