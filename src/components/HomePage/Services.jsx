import React from 'react';
import ServiceBtn from './Service-Btn';

const Services =()=>{
    return (
        <>
        <section className='row text-center'>
        <h1 className="col-12 my-4">Services</h1>

            <section className='col-sm-6 my-2'>
            <button type="button" class="btn btn-primary btn-lg w-50" style={{backgroundColor:"red",border:"1px solid black"}}><i class="fa-solid fa-indian-rupee-sign"></i> Recharge</button>
            </section>

            <section className='col-sm-6 my-2'>
            <button type="button" class="btn btn-primary btn-lg w-50" style={{backgroundColor:"green",border:"1px solid black"}}><i class="fa-solid fa-file-invoice-dollar"></i> Withdrawal</button>
            </section>


        <div className='row my-3 container-fluid'>
            
        
           <section className='col-3 my-3'>
          
           <ServiceBtn src="https://www.dolepro.store/h5/assets/i9.17a81387.png" btnName="Gift Redemption"/>

           </section>

           <section className='col-3 my-3'>

           <ServiceBtn src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFCMzVFNzBGQUU2RDExRUQ5RkY2RDYwMUREM0IwRDYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFCMzVFNzEwQUU2RDExRUQ5RkY2RDYwMUREM0IwRDYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUIzNUU3MERBRTZEMTFFRDlGRjZENjAxREQzQjBENjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUIzNUU3MEVBRTZEMTFFRDlGRjZENjAxREQzQjBENjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6JhAUaAAAJIklEQVR42uyd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" btnName="Invitation"/>
           </section>


           <section className='col-3 my-3'>
           <ServiceBtn src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIxRTc4OTc2QUU2RDExRUQ4QzZFRTA5MUZDMkY5QUMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIxRTc4OTc3QUU2RDExRUQ4QzZFRTA5MUZDMkY5QUMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjFFNzg5NzRBRTZEMTFFRDhDNkVFMDkxRkMyRjlBQzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjFFNzg5NzVBRTZEMTFFRDhDNkVFMDkxRkMyRjlBQzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4wPHqCAAAL0ElEQVR42uyd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" btnName="My Teams"/>
          
        
           </section>

           <section className='col-3 my-3'>
           <ServiceBtn src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCOUFBRjA1QUI3MzExRUQ5QTVGRDkzNEJFRTMxREYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCOUFBRjA2QUI3MzExRUQ5QTVGRDkzNEJFRTMxREYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUI5QUFGMDNBQjczMTFFRDlBNUZEOTM0QkVFMzFERjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUI5QUFGMDRBQjczMTFFRDlBNUZEOTM0QkVFMzFERjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4E2MT6AAAIWUlEQVR42uyd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" btnName="My Projects"/>
         
        
           </section>
        </div>

        <div className='row my-3 container-fluid'>
            
        
        <section className='col-3 '>
        <ServiceBtn src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE0M0I1NDVDQUU2RDExRURBMEZBOTY0MkQyQjlCQzUwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE0M0I1NDVEQUU2RDExRURBMEZBOTY0MkQyQjlCQzUwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTQzQjU0NUFBRTZEMTFFREEwRkE5NjQyRDJCOUJDNTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTQzQjU0NUJBRTZEMTFFREEwRkE5NjQyRDJCOUJDNTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6mmlmpAAAJbElEQVR42uyd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" btnName="Customer Service"/>
        </section>

        <section className='col-3 '>
       <ServiceBtn src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZFQTY2MkZCQURERTExRUQ5MkVGREY4MEJFOUUzRDM0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZFQTY2MkZDQURERTExRUQ5MkVGREY4MEJFOUUzRDM0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkVBNjYyRjlBRERFMTFFRDkyRUZERjgwQkU5RTNEMzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkVBNjYyRkFBRERFMTFFRDkyRUZERjgwQkU5RTNEMzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4lTZ6XAAAIsklEQVR42uyd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" btnName="App Download"/>
        </section>


        <section className='col-3 '>
        
       <ServiceBtn src="data:image/png;base64,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" btnname="Money Making"/>
        </section>

        <section className='col-3 '>
        <ServiceBtn src="data:image/png;base64,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" btnName="Check Ins"/>
        </section>


        </div>

          
            
        </section>
        </>
    )
}

export default Services