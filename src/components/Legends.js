class Legends {
	
	constructor(videoControl){

        this._videoControl = videoControl;
		
        this.data = null;
        this.pointer = 0;
        
        this._legendElement = document.getElementById('legend');;
        this._displayFrameNunberElement = document.getElementById('displayFrameNunber');
        this._btBack = document.getElementById('btBack');
        this._btNext = document.getElementById('btNext');

        this._btNext.onclick = this._nextLegend.bind(this);
        this._btBack.onclick = this._backLegend.bind(this);
                
    }

    loadData(data){
        this.data = data;
        this._writeLegend();
    }

    _writeLegend(){
        this._legendElement.innerHTML = this.data[this.pointer].text;
        this._displayFrameNunberElement.innerHTML = this.data[this.pointer].id;

        this._videoPointer();
    }

    _videoPointer(){
        this._videoControl.setPositionVideo(this.data[this.pointer].videoInit);
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