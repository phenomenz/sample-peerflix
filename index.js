var peerflix = require('peerflix');

var engine;

function opentorrent(torrent) {
    var opts={};

    if (/^magnet:/.test(torrent)) {
        startengine(torrent, opts);
    }
}

var startengine = function(torrent, opts) {
    if (!opts) {
        opts = {};  
    }
    engine = peerflix(torrent,opts);
    var hotswaps = 0;

    engine.on('hotswap', function() {
        hotswaps++;
    });

    var started = Date.now();
    var wires = engine.swarm.wires;
    var swarm = engine.swarm;

    var active = function(wire) {
        return !wire.peerChoking;
    };

    engine.server.on('listening', function() {
        
        console.log("http://localhost:"+engine.server.address().port);
    });

    engine.on('ready', function() {
        engine.server.listen();
    });

    engine.server.once('error', function() {
        engine.server.listen(0);
    });
   
};

startengine("magnet:?xt=urn:btih:QLQAC3XFSW6JLFLFEHYSTA6BJ7PCCBWN&dn=Star.Wars.The.Clone.Wars.S06E07.REPACK.WEBRip.x264-2HD&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.istole.it:80&tr=udp://open.demonii.com:80&tr=udp://tracker.coppersurfer.tk:80", {});