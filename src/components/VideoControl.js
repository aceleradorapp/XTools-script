class VideoControl {
	
	constructor(videoElement){
		this._videoElement = videoElement;
        
        this.setPositionVideo(0);
        
        this._position = this._videoElement.currentTime;
        this._duration = this._videoElement.duration;
        this._pointer = 0;
        this._precision = 0.1;
        this._velocity = 1;

        this._functionReturnPosition=null;
    }

    load(url){
        this._videoElement.src = url;  
         
        this._videoElement.addEventListener('loadeddata', this._videoLoaded.bind(this), false ); 
        this._videoElement.addEventListener('timeupdate', this._timeUpdateHandler.bind(this), false);
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
}

module.exports = VideoControl;