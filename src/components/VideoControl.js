class VideoControl {
	
	constructor(videoElement){
		this._videoElement = videoElement;
        
        this.setPositionVideo(0);
        
        this._position = this._videoElement.currentTime;
        this._duration = this._videoElement.duration;
        this._pointer = 0;
        this._precision = 0.1;
        this._velocity = 1;
        this._videoLoadedHandler = false;
        this._dataTrack = null;
        this.tracked = false;

        this.reqAnimationId=null;

        this._functionReturnPosition=null;
        this._funcitonReturnTrack = null;
    }

    load(url){
        this._videoElement.src = url;  
         
        this._videoElement.addEventListener('loadeddata', this._videoLoaded.bind(this), false ); 
        this._videoElement.addEventListener('timeupdate', this._timeUpdateHandler.bind(this), false);
    }

    track(velocity=1, data=null, func=null){
        this._funcitonReturnTrack = func;
        this._dataTrack = data; 

        this.stopDrawFrame();
        
        if(this._dataTrack.videoInit == this._dataTrack.videoFinal || this._dataTrack.type == 'screen'){
            this._funcitonReturnTrack('block');
            return;
        }    
        
        this._funcitonReturnTrack('unlock');
    }

    playTrack(){
        
        this.stopDrawFrame();       

        if(this._videoLoadedHandler){
            this._funcitonReturnTrack('block');

            this.tracked = true;
            this.setPositionVideo(this._dataTrack.videoInit);
            this._videoElement.play();

            this.reqAnimationId = requestAnimationFrame(this.drawFrame.bind(this));            
        }
    }

    eventsReturn(func){
        this._functionReturnPosition = func;
    }

    getPointer(){
        return this._pointer;
    }

    getPositionVideo(){
        return this._videoElement.currentTime;
    }

    getTotalPosition(){
        return this._duration;
    }

    getVelocity(){
        return this._velocity;
    }

    setPositionVideo(position){
		this._processVideo(position);			
	}

    setPointer(value){
        this._pointer = value;
    }

    setPrecision(value){
        this._precision = parseFloat(value);
    }

    setVelocity(value){
        this._velocity = parseFloat(value);
        this._videoElement.playbackRate = this._velocity;        
    }

    resetVelocity(){
        this._videoElement.playbackRate = 1;
    }

    setRolePositionVideo(value){
        if(value < 0){
            this._pointer += this._precision;
        }else{
            this._pointer -= this._precision;
        }
        
        if(this._pointer < 0){
            this._pointer = 0;
            return;
        }

        if(this._pointer > this._duration){
            this._pointer = this._duration;
            return;
        }

        this.setPositionVideo(this._pointer);

        let data = {
            position: this.getPositionVideo(),
            duration: this._duration
        }

        this._functionReturnPosition(data);
    }

    _processVideo(position){
        this._pointer = position;
        this._videoElement.currentTime = position;
    }

    _videoLoaded(e){
        this._videoLoadedHandler = true;
        e.typeEvent = 'video-loaded';

        if(this._functionReturnPosition){
            this._functionReturnPosition(e);
        }
    }

    _timeUpdateHandler(e){
        e.typeEvent = 'video-update';

        if(this._functionReturnPosition){
            this._functionReturnPosition(e);
        }
    }

    drawFrame () {
        
        if(this._videoElement.currentTime >= this._dataTrack.videoFinal){     
            this.tracked = false;                  
            this.setPositionVideo(this._dataTrack.videoFinal);
            this.stopDrawFrame();
            return;            
        }
        
        this.reqAnimationId = window.requestAnimationFrame(this.drawFrame.bind(this));
    };

    stopDrawFrame(){
        this._videoElement.pause();
        if(this.reqAnimationId){
            window.cancelAnimationFrame(this.reqAnimationId);
            this._funcitonReturnTrack('complete');
            this.reqAnimationId = null;
        }
    }
}

module.exports = VideoControl;