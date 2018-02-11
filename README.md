# EasyPhotoShow

This is a simple javascript library. You can enlarge the image after click.
default image size is original image size.

## Features

* Easy to use 
* Lightweight 
* Support responsive web
* Support most broswer  (IE 9 +)
* Javascript only. (No library or framework)

## How to use?

###### 1.&nbsp; Set class into your img 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default classname is ``EasyPhotoShow``, you can reset by youself

```html
 <img class="EasyPhotoShow" src="img/example.jpg" width:100; height:100; /> 
```       


###### 2.&nbsp;  Add javascript Code 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;call ``EasyPhotoShow.show();`` &nbsp; it's working now.
```javascript
<script type="text/javascript">
        EasyPhotoShow.show();
</script>        
```       
## Method

you can set JSON parameter , like this

```javascript
    EasyPhotoShow.show({
        className : "EasyPhotoShow",          //work class, default "EasyPhotoShow"
        speed : 10,                           //animate speed, default 100 millisecond
        scenes : true,                        //image's background, default false
        scenesStyle : "background:white;",    //background style,it's css style , default white
        fixedScenes : false,                  //background size fix, default false
        responsive : true,                    //responsive,default true
        animateShow : true                    //image animation, default true
    });
```

or call function

```javascript
    EasyPhotoShow.show()
                 .speed(100)
                 .scenes(true)
                 .scenesStyle("background:white;")
                 .responsive(true)
                 .fixedScenes(true)
                 .animateShow(true);
```          


