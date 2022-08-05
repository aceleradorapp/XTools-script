class Legends {
	
	constructor(videoControl){

        this._videoControl = videoControl;
		
        this.data = null;
        this.pointer = 0;
        this.velocityVideo = 1;

        this._legendSelectedReturn = null;
        
        this._legendElement = document.getElementById('legend');;
        this._displayFrameNunberElement = document.getElementById('displayFrameNunber');
        this._btPlay = document.getElementById('btPlay');
        this._btBack = document.getElementById('btBack');
        this._btNext = document.getElementById('btNext');

        this._btPlay.onclick = this._playLegend.bind(this);
        this._btNext.onclick = this._nextLegend.bind(this);
        this._btBack.onclick = this._backLegend.bind(this);
                
    }

    loadData(data){
        this.data = data;        
    }

    start(){
        this._writeLegend();
    }

    setPointer(value){
        this.pointer = value-1;
        this._writeLegend();
    }

    _writeLegend(){
        this._legendElement.innerHTML = this.data[this.pointer].text;
        this._displayFrameNunberElement.innerHTML = this.data[this.pointer].id;

        this._videoPointer(); 
        if(this._legendSelectedReturn){
            this._legendSelectedReturn(this.data[this.pointer]);      
        } 
    }

    addEventLegendSelected(func){     
        this._legendSelectedReturn = func;        
    }

    _videoPointer(){
        this._videoControl.setPositionVideo(this.data[this.pointer].videoInit);
        this._videoControl.track(1, this.data[this.pointer],(e)=>{
            if(e=='block'){
                this._btPlay.classList.add('bt-disable');
            }else if(e=='unlock'){
                this._btPlay.classList.remove('bt-disable');
            }else if(e=='complete'){
                this._btPlay.classList.remove('bt-disable');
            }
        });
    }

    _playLegend(e){
        this._videoControl.playTrack();
    }

    _nextLegend(e){
        this.pointer++

        if(this.pointer > this.data.lenght-1){
            this.pointer--;
        }

        this._writeLegend();
    }
    
    _backLegend(e){        
        this.pointer--

        if(this.pointer < 0){
            this.pointer = 0;
        }

        this._writeLegend();
    } 
}

module.exports = Legends;