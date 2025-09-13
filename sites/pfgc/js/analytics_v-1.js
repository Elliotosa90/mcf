
// https://stevenyeung.com/article/google-analytics-scroll-depth-tracking-using-scrollmagic-jquery/
// http://janpaepke.github.io/ScrollMagic/examples/basic/scene_manipulation.html

(function ($, ScrollMagic) {

    var _currentScene = null;
    var _timeId = null;

    var _loggingEnabled = false;
    var _allowMultipleCalls = true;

    // init the scene controller
    var depthCtrl = new ScrollMagic.Controller();
    var scenes = [];
    
    window.onload = function () {
        log('updating scene durations');

        // all images have finished loading, so the scene durations need to be updated since the content shifted
        for (var i = 0; i < scenes.length; i++) {
            var obj = scenes[i];
            if (obj && obj.scene && obj.metric) {
                $this = $(obj.metric.trigger);
                var height = $this.outerHeight();
                obj.scene.duration(height);
                obj.metric.duration = height;
            }
        }
    };

    $(function () {
        //make sure google analytics is on the page
        if (typeof ga === 'function') {
            init();            
        }
    });

    function init() {
        var metrics = [];
        $('[data-analytics-label]').each(function () {
            $this = $(this);
            var lbl = $this.attr('data-analytics-label');
            if (lbl && lbl.length > 0) {

                //is this element below the fold?
                var belowFold = ($this.offset().top > $(document).height());
                var height = $this.get(0).scrollHeight;

                metrics.push({
                    category: 'Scroll Depth',
                    action: 'Elements',
                    trigger: this,
                    duration: height || 50,  // the height of the scene in pixels
                    hook: .5, //(belowFold ? .5 : 0), // 0-1, a decimal where 0 = top and 1 = bottom (for example, .5 triggers event when element is half way on screen)
                    offset: 0,
                    nonInteraction: true,
                    value: 1, // ga event value,
                    label: lbl, // ga event label,
                    wait: 100  // milliseconds to wait before firing GA event.
                });
            }
        });       

        for (var i = 0; i < metrics.length; i++) {
            var metric = metrics[i];
            var scene = createScene(metric);
            scene.addTo(depthCtrl);
            scenes.push({
                scene: scene,
                metric: metric
            });
        }
    }

    function createScene(metric) {
        var scene = new ScrollMagic.Scene({
            triggerElement: metric.trigger,
            triggerHook: metric.hook,
            offset: metric.offset,
            duration: metric.duration
        })
        .on('enter', function (e) {
            log('entering scene: ' + metric.label);
            _currentScene = this;
            clearTimeout(_timeId);

            _timeId = setTimeout(function () {
                //only send the event if we stayed on it long enough to trigger
                if (_currentScene === scene) {

                    if (_loggingEnabled)
                        console.log('sending event to GA: ', metric);

                    ga('send', 'event', metric.category, metric.action, metric.label, metric.value, metric.nonInteraction);

                    // destroy the ScrollMagic scene once the event fires so if the user scrolls up again to this element, it's not fired again.
                    if (!_allowMultipleCalls)
                        e.target.destroy();  
                }
            }, metric.wait);

        })
        .on('leave', function (e) {
            log('leaving scene: ' + metric.label);
            _currentScene = null;
            clearTimeout(_timeId);
        });
        
        return scene;
    }

    function log(msg) {
        if (_loggingEnabled)
            console.log(msg);
    }

})(jQuery, ScrollMagic);