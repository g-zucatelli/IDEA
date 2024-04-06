angular.module('ID_App.controllers', ['ionic', 'ngCordova', 'ID_App.services'])
 
     
/*
Controller for the discover page
*/
.controller('ID_Ctrl', function($scope, $interval, EMO) {
	console.log("chamou EMO???");
	//$scope.state = EMO.getmodel(Math.round(Math.random() * (3)) + 1);
	$scope.state = EMO.getmodel(0);
	$scope.zeropadding = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	// $scope.pictureUrl = 'http://placehold.it/300x300';
	console.log("INICIO!!!");
	//console.log($scope.state);

	function Teste2(){
	  console.log("Teste Teste");
	}

	$scope.ind=0;
	
	$scope.ChangeImage = function(){
		 change = $interval(function(){
			$scope.state = EMO.getmodel($scope.ind);
			//console.log($scope.state);
		},250);
	}

	$scope.StopChange = function(){
		$interval.cancel(change);
		$scope.state = EMO.getmodel(0);	
	}


		
	$scope.Print_Data = function(){
		console.log("FFT???");
		var fft = new FFT(512, 16000);
    	fft.forward($scope.signal);
    	var spectrum = fft.spectrum;
    	spec = 64*spectrum
    	console.log(64*spectrum[0]);
    	console.log(spectrum[1]);
    	console.log(spectrum[2]);
    	console.log(spectrum[3]);

    	$scope.XPTO = angular.toJson(spectrum, true);
    	console.log($scope.XPTO);
    	console.log($scope.XPTO.length())
	}

	// $scope.pulse = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	// var fft = new FFT(16, 16000);
	// fft.forward($scope.pulse);
 	// var spectrum = fft.spectrum;
	// console.log(angular.toJson(spectrum));

	$scope.fourier=[];

	
	/*-----------------|Area de Testes|-----------------*/
	// Capture configuration object
	var captureCfg = {};

	// Audio Buffer
	var audioDataBuffer = [];

	// Timers
	var timerInterVal, timerGenerateSimulatedData;

	var objectURL = null;

	// Info/Debug
	var totalReceivedData = 0;


	
	/**
	 * Called continuously while AudioInput capture is running.
	 */
	$scope.cont=0;
	function onAudioInputCapture(evt) {
	    try {
	        if (evt && evt.data) {
	            // Increase the debug counter for received data
	            // while(evt.data[0] == 0){
	            // 	evt.data.splice(0, 1000);
	            // }

	            totalReceivedData += evt.data.length;
	            
	            //console.log(totalReceivedData);
	            //console.log(totalReceivedData.lenght);
	            // $scope.XPTO = angular.toJson(evt.data, true);
            	// console.log($scope.XPTO);
            	// console.log($scope.XPTO[2]);
            	
	            audioDataBuffer = audioDataBuffer.concat(evt.data);
	            //audioDataBuffer.pop();
	            console.log(typeof(audioDataBuffer));
	            console.log(audioDataBuffer.length);

	            
	            if (audioDataBuffer.length >= 8000){
	            	//$scope.XPTO2 = angular.toJson(audioDataBuffer, true);
	            	console.log("ATINGIU 8000!!!")
	            	

	            	$scope.peguei = audioDataBuffer.slice(0,8000); 
	            	audioDataBuffer.splice(0,4000);
	            	console.log($scope.peguei[0]);
	            	console.log(audioDataBuffer.length);
	            	
	            	var loops = 0;
	            	var local = 0;
	            	console.log($scope.fourier[511]);
	            	console.log("Start Loop!")
	            	while (loops < 7500){
	            		//console.log("entrou no loop while!");
	            		
	            		for(local = 0; local < 320; local++){
	            		//console.log("entrou no loop FOR!");	
	            		$scope.fourier[local] = $scope.peguei[local+loops];	
	            		}
	            		
	            		// $scope.fourier.push($scope.zeropadding);
	            		// console.log($scope.fourier);
	            		// console.log($scope.fourier[319]);
	            		// console.log($scope.fourier[511]);
	            		$scope.teste=EMO.FFT_teste($scope.fourier);
	            		EMO.Extracao($scope.teste);
	            		
	            		loops += 160;
	            		//console.log($scope.atributo);
	            		//console.log($scope.atributo[0]);
	            		//console.log($scope.atributo[1]);
	            		//sconsole.log($scope.atributo[2]);
	            	}
	            	console.log("Vai Testar!!!")
	            	$scope.ind = EMO.Teste();
	            	console.log($scope.ind);
	            	$scope.state = EMO.getmodel($scope.ind);
	            	console.log($scope.state);
	            	$scope.cont++;
	            	
	            	console.log("Terminou segundo:"+$scope.cont);
	            	//stopCapture();
	            	//$scope.erro = EMO.frocederror();
	            }else if ($scope.cont == 0 ) {audioDataBuffer.splice(0,4000); $scope.cont++;}
	            $scope.state = EMO.getmodel($scope.ind);
	            //console.log(audioDataBuffer[0]);
	            //console.log(audioDataBuffer[1]);
	            //console.log(audioDataBuffer[2]);
	            //console.log(audioDataBuffer[3]);
	            //console.log(audioDataBuffer[4]);
	            //console.log(audioDataBuffer[audioDataBuffer.length]);
	            console.log(audioDataBuffer.length);
	        }
	        else {
	            alert("Unknown audioinput event!");
	        }
	    }
	    catch (ex) {
	        alert("onAudioInputCapture ex: " + ex);
	    }
	}


	/**
	 * Called when a plugin error happens.
	 */
	function onAudioInputError(error) {
	    alert("onAudioInputError event recieved: " + JSON.stringify(error));
	}


	/*------------#-#-#-------------*/
	var startCapture = function () {
	    try {
	        if (window.audioinput && !audioinput.isCapturing()) {
	            
	            // Get the audio capture configuration //

	            var captureCfg = {
				 
				    // The Sample Rate in Hz.  For convenience, use the audioinput.SAMPLERATE constants to set this parameter. 
				    //sampleRate: audioinput.SAMPLERATE.CD_AUDIO_44100Hz,
				    sampleRate: audioinput.SAMPLERATE.VOIP_16000Hz,

				    // Maximum size in bytes of the capture buffer. 
				    bufferSize: 4000,
				    
				    // The number of channels to use: Mono (1) or Stereo (2). 
				    // For convenience, use the audioinput.CHANNELS constants to set this parameter. 
				    channels: audioinput.CHANNELS.MONO,
				    
				    // The audio format. Currently PCM_16BIT and PCM_8BIT are supported. 
				    // For convenience, use the audioinput.FORMAT constant to access the possible  
				    // formats that the plugin supports. 
				    format: audioinput.FORMAT.PCM_16BIT,
				    
				    // Specifies if the audio data should be normalized or not. 
				    normalize: true,
				    
				    // Specifies the factor to use if normalization is performed. 
				    // normalizationFactor: 32767.0,
				    normalizationFactor: 8000.0,

				    // If set to true, the plugin will handle all conversion of the data to  
				    // web audio. The plugin can then act as an AudioNode that can be connected  
				    // to your web audio node chain. 
				    streamToWebAudio: false,
				    
				    // Used in conjunction with streamToWebAudio. If no audioContext is given,  
				    // one (prefixed) will be created by the plugin. 
				    audioContext: null,
				    
				    // Defines how many chunks will be merged each time, a low value means lower latency 
				    // but requires more CPU resources. 
				    concatenateMaxChunks: 0,
				    
				    // Specifies the type of the type of source audio your app requires. 
				    // For convenience, use the audioinput.AUDIOSOURCE_TYPE constants to set this parameter: 
				    // -DEFAULT 
				    // -CAMCORDER - Microphone audio source with same orientation as camera if available. 
				    // -UNPROCESSED - Unprocessed sound if available. 
				    // -VOICE_COMMUNICATION - Tuned for voice communications such as VoIP. 
				    // -MIC - Microphone audio source. (Android only) 
				    // -VOICE_RECOGNITION - Tuned for voice recognition if available (Android only) 
				    
				    // audioSourceType: audioinput.AUDIOSOURCE_TYPE.DEFAULT
				    audioSourceType: audioinput.AUDIOSOURCE_TYPE.MIC
				};


	            audioinput.start(captureCfg);
	            console.log("Microphone input started!");

	            // Throw previously created audio
	            // document.getElementById("recording-list").innerHTML = "";
	            // if (objectURL && URL.revokeObjectURL) {
	            //     URL.revokeObjectURL(objectURL);
	            // }

	            // Start the Interval that outputs time and debug data while capturing
	            //
	            timerInterVal = setInterval(function () {
	                if (audioinput.isCapturing()) {
	                    document.getElementById("infoTimer").innerHTML = "" +
	                        new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") +
	                        "|Received:" + totalReceivedData;
	                }
	            }, 1000);

	            disableStartButton();
	        }
	    }
	    catch (e) {
	        alert("startCapture exception: " + e);
	    }
	};

	var stopCapture = function () {
	    try {
	        if (window.audioinput && audioinput.isCapturing()) {
	            if (timerInterVal) {
	                clearInterval(timerInterVal);
	            }

	            if (window.audioinput) {
	                audioinput.stop();
	            }

	            $scope.cont=0;
	            totalReceivedData = 0;
	            //document.getElementById("infoTimer").innerHTML = "";

	            //consoleMessage("Encoding WAV...");
	            //var encoder = new WavAudioEncoder(captureCfg.sampleRate, captureCfg.channels);
	            //encoder.encode([audioDataBuffer]);

	            //console.log("Encoding WAV finished");

	            //var blob = encoder.finish("audio/wav");

	            //console.log("BLOB created");
	            //console.log(blob);

	            //var reader = new FileReader();

	            // reader.onload = function (evt) {
	            //     var audio = document.createElement("AUDIO");
	            //     audio.controls = true;
	            //     audio.src = evt.target.result;
	            //     audio.type = "audio/wav";
	            //     document.getElementById("recording-list").appendChild(audio);
	            //     consoleMessage("Audio created");
	            //     audioDataBuffer = [];
	            // };

	            // console.log("Loading from BLOB");
	            // reader.readAsDataURL(blob);

	            disableStopButton();
	        }
	    }
	    catch (e) {
	        alert("stopCapture exception: " + e);
	    }
	};









	var initUIEvents = function () {
	    document.getElementById("startCapture").addEventListener("click", startCapture);
	    document.getElementById("stopCapture").addEventListener("click", stopCapture);
		var fft = new FFT(512, 16000);
	};

	document.addEventListener('deviceready', function(){
	    if (window.cordova && window.audioinput) {
	        initUIEvents();
	        console.log("Device Ready!!!!");
	        console.log("Use 'Start Capture' to begin...");

	        // Subscribe to audioinput events
	        //
	        window.addEventListener('audioinput', onAudioInputCapture, false);
	        window.addEventListener('audioinputerror', onAudioInputError, false);
	    }
	    else {
	        console.log("cordova-plugin-audioinput not found!");
	        disableAllButtons();
	    }
	    for (i=0;i<512;i++) $scope.fourier[i]=0;
	});

})

/*
Controller for the favorites page
*/
.controller('Config_Ctrl', function($scope) {

})

.controller('Info_Ctrl', function($scope) {

})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

})

;