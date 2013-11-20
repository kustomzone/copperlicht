var CL3D = {};
CL3D.DebugOutput = function(d, a) {
  this.DebugRoot = null;
  this.FPSRoot = null;
  var e = document.getElementById(d);
  if (e == null) {
    CL3D.gCCDebugInfoEnabled = false;
    return;
  }
  this.DebugRoot = e.parentNode;
  if (this.DebugRoot) {
    this.LoadingRoot = document.createElement("div");
    this.DebugRoot.appendChild(this.LoadingRoot);
    var b = document.createTextNode("Loading...");
    this.LoadingRootText = b;
    this.LoadingRoot.appendChild(b);
  }
  if (a) {
    this.enableFPSCounter();
  }
};
CL3D.DebugOutput.prototype.enableFPSCounter = function() {
  if (this.FPSRoot != null) {
    return;
  }
  this.FPSRoot = document.createElement("div");
  this.DebugRoot.appendChild(this.FPSRoot);
  var a = document.createTextNode("FPS: 0");
  this.FPSRootText = a;
  this.FPSRoot.appendChild(a);
  this.frames = 0;
  this.lasttime = (new Date).getTime();
};
CL3D.DebugOutput.prototype.updatefps = function(c) {
  if (this.FPSRootText == null) {
    return;
  }
  this.frames += 1;
  var b = (new Date).getTime();
  if (b - this.lasttime > 1E3) {
    var d = this.frames / (b - this.lasttime) * 1E3;
    var a = "FPS: " + d.toFixed(2);
    if (c != null) {
      a += c;
    }
    this.FPSRootText.nodeValue = a;
    this.lasttime = b;
    this.frames = 0;
  }
};
CL3D.DebugOutput.prototype.print = function(a) {
  if (CL3D.gCCDebugInfoEnabled == false) {
    return;
  }
  this.printInternal(a, false);
};
CL3D.DebugOutput.prototype.setLoadingText = function(a) {
  if (!this.LoadingRoot) {
    return;
  }
  if (a == null) {
    this.LoadingRoot.style.display = "none";
  } else {
    this.LoadingRoot.style.display = "block";
    this.LoadingRootText.nodeValue = a;
  }
};
CL3D.DebugOutput.prototype.printError = function(b, a) {
  this.printInternal(b, true, a);
};
CL3D.DebugOutput.prototype.jsConsolePrint = function(a) {
  setTimeout(function() {
    throw new Error(a);
  }, 0);
};
CL3D.DebugOutput.prototype.printInternal = function(e, d, b) {
  if (CL3D.gCCDebugInfoEnabled == false && d != true) {
    return;
  }
  if (b) {
    this.DebugRoot.appendChild(document.createElement("br"));
    var a = document.createElement("div");
    this.DebugRoot.appendChild(a);
    a.innerHTML = e;
  } else {
    this.DebugRoot.appendChild(document.createElement("br"));
    var c = document.createTextNode(e);
    this.DebugRoot.appendChild(c);
  }
};
CL3D.gCCDebugInfoEnabled = true;
CL3D.gCCDebugOutput = null;
CL3D.CCFileLoader = function(a) {
  this.FileToLoad = a;
  this.xmlhttp = false;
  if (!this.xmlhttp && typeof XMLHttpRequest != "undefined") {
    try {
      this.xmlhttp = new XMLHttpRequest;
    } catch (b) {
      this.xmlhttp = false;
    }
  }
  if (!this.xmlhttp && window.createRequest) {
    try {
      this.xmlhttp = window.createRequest();
    } catch (b) {
      this.xmlhttp = false;
    }
  }
  this.load = function(c) {
    if (this.xmlhttp == false) {
      CL3D.gCCDebugOutput.printError("Your browser doesn't support AJAX");
      return;
    }
    var d = this;
    try {
      this.xmlhttp.open("GET", this.FileToLoad, true);
    } catch (f) {
      CL3D.gCCDebugOutput.printError("Could not open file " + this.FileToLoad + ": " + f.message);
      return;
    }
    this.xmlhttp.onreadystatechange = function() {
      if (d.xmlhttp.readyState == 4) {
        if (d.xmlhttp.status != 200 && (d.xmlhttp.status != 0 && d.xmlhttp.status != null)) {
          CL3D.gCCDebugOutput.printError("Could not open file " + d.FileToLoad + " (status:" + d.xmlhttp.status + ")");
        }
        c(d.xmlhttp.responseText);
      }
    };
    try {
      this.xmlhttp.send(null);
    } catch (f) {
      CL3D.gCCDebugOutput.printError("Could not open file " + d.FileToLoad);
      return;
    }
  };
  this.loadComplete = function(c) {
    alert("loaded :" + c);
  };
};
CL3D.PI = 3.14159265359;
CL3D.RECIPROCAL_PI = 1 / 3.14159265359;
CL3D.HALF_PI = 3.14159265359 / 2;
CL3D.PI64 = 3.141592653589793;
CL3D.DEGTORAD = 3.14159265359 / 180;
CL3D.RADTODEG = 180 / 3.14159265359;
CL3D.TOLERANCE = 1E-8;
CL3D.radToDeg = function(a) {
  return a * CL3D.RADTODEG;
};
CL3D.degToRad = function(a) {
  return a * CL3D.DEGTORAD;
};
CL3D.iszero = function(b) {
  return b < 1E-8 && b > -1E-8;
};
CL3D.isone = function(b) {
  return b + 1E-8 >= 1 && b - 1E-8 <= 1;
};
CL3D.equals = function(d, c) {
  return d + 1E-8 >= c && d - 1E-8 <= c;
};
CL3D.clamp = function(c, a, b) {
  if (c < a) {
    return a;
  }
  if (c > b) {
    return b;
  }
  return c;
};
CL3D.fract = function(a) {
  return a - Math.floor(a);
};
CL3D.max3 = function(e, d, f) {
  if (e > d) {
    if (e > f) {
      return e;
    }
    return f;
  }
  if (d > f) {
    return d;
  }
  return f;
};
CL3D.min3 = function(e, d, f) {
  if (e < d) {
    if (e < f) {
      return e;
    }
    return f;
  }
  if (d < f) {
    return d;
  }
  return f;
};
CL3D.getAlpha = function(a) {
  return(a & 4278190080) >>> 24;
};
CL3D.getRed = function(a) {
  return(a & 16711680) >> 16;
};
CL3D.getGreen = function(a) {
  return(a & 65280) >> 8;
};
CL3D.getBlue = function(a) {
  return a & 255;
};
CL3D.createColor = function(d, f, e, c) {
  d = d & 255;
  f = f & 255;
  e = e & 255;
  c = c & 255;
  return d << 24 | f << 16 | e << 8 | c;
};
CL3D.getInterpolatedColor = function(d, c, b) {
  var a = 1 - b;
  return CL3D.createColor(CL3D.getAlpha(d) * b + CL3D.getAlpha(c) * a, CL3D.getRed(d) * b + CL3D.getRed(c) * a, CL3D.getGreen(d) * b + CL3D.getGreen(c) * a, CL3D.getBlue(d) * b + CL3D.getBlue(c) * a);
};
CL3D.ColorF = function() {
  this.A = 1;
  this.R = 1;
  this.G = 1;
  this.B = 1;
};
CL3D.ColorF.prototype.clone = function() {
  var a = new CL3D.Light;
  a.A = this.A;
  a.R = this.R;
  a.G = this.G;
  a.B = this.B;
  return a;
};
CL3D.ColorF.prototype.A = 1;
CL3D.ColorF.prototype.R = 1;
CL3D.ColorF.prototype.G = 1;
CL3D.ColorF.prototype.B = 1;
CL3D.CLTimer = function() {
};
CL3D.CLTimer.getTime = function() {
  var a = new Date;
  return a.getTime();
};
CL3D.Vect3d = function(a, c, b) {
  if (a != null) {
    this.X = a;
    this.Y = c;
    this.Z = b;
  }
};
CL3D.Vect3d.prototype.X = 0;
CL3D.Vect3d.prototype.Y = 0;
CL3D.Vect3d.prototype.Z = 0;
CL3D.Vect3d.prototype.set = function(a, c, b) {
  this.X = a;
  this.Y = c;
  this.Z = b;
};
CL3D.Vect3d.prototype.clone = function() {
  return new CL3D.Vect3d(this.X, this.Y, this.Z);
};
CL3D.Vect3d.prototype.copyTo = function(a) {
  a.X = this.X;
  a.Y = this.Y;
  a.Z = this.Z;
};
CL3D.Vect3d.prototype.substract = function(a) {
  return new CL3D.Vect3d(this.X - a.X, this.Y - a.Y, this.Z - a.Z);
};
CL3D.Vect3d.prototype.substractFromThis = function(a) {
  this.X -= a.X;
  this.Y -= a.Y;
  this.Z -= a.Z;
};
CL3D.Vect3d.prototype.add = function(a) {
  return new CL3D.Vect3d(this.X + a.X, this.Y + a.Y, this.Z + a.Z);
};
CL3D.Vect3d.prototype.addToThis = function(a) {
  this.X += a.X;
  this.Y += a.Y;
  this.Z += a.Z;
};
CL3D.Vect3d.prototype.addToThisReturnMe = function(a) {
  this.X += a.X;
  this.Y += a.Y;
  this.Z += a.Z;
  return this;
};
CL3D.Vect3d.prototype.normalize = function() {
  var a = this.X * this.X + this.Y * this.Y + this.Z * this.Z;
  if (a > -1E-7 && a < 1E-7) {
    return;
  }
  a = 1 / Math.sqrt(a);
  this.X *= a;
  this.Y *= a;
  this.Z *= a;
};
CL3D.Vect3d.prototype.getNormalized = function() {
  var a = this.X * this.X + this.Y * this.Y + this.Z * this.Z;
  if (a > -1E-7 && a < 1E-7) {
    return new CL3D.Vect3d(0, 0, 0);
  }
  a = 1 / Math.sqrt(a);
  return new CL3D.Vect3d(this.X * a, this.Y * a, this.Z * a);
};
CL3D.Vect3d.prototype.setLength = function(b) {
  var a = this.X * this.X + this.Y * this.Y + this.Z * this.Z;
  if (a > -1E-7 && a < 1E-7) {
    return;
  }
  a = b / Math.sqrt(a);
  this.X *= a;
  this.Y *= a;
  this.Z *= a;
};
CL3D.Vect3d.prototype.setTo = function(a) {
  this.X = a.X;
  this.Y = a.Y;
  this.Z = a.Z;
};
CL3D.Vect3d.prototype.equals = function(a) {
  return CL3D.equals(this.X, a.X) && (CL3D.equals(this.Y, a.Y) && CL3D.equals(this.Z, a.Z));
};
CL3D.Vect3d.prototype.equalsZero = function() {
  return CL3D.iszero(this.X) && (CL3D.iszero(this.Y) && CL3D.iszero(this.Z));
};
CL3D.Vect3d.prototype.equalsByNumbers = function(a, c, b) {
  return CL3D.equals(this.X, a) && (CL3D.equals(this.Y, c) && CL3D.equals(this.Z, b));
};
CL3D.Vect3d.prototype.isZero = function() {
  return this.X == 0 && (this.Y == 0 && this.Z == 0);
};
CL3D.Vect3d.prototype.getLength = function() {
  return Math.sqrt(this.X * this.X + this.Y * this.Y + this.Z * this.Z);
};
CL3D.Vect3d.prototype.getDistanceTo = function(b) {
  var a = b.X - this.X;
  var d = b.Y - this.Y;
  var c = b.Z - this.Z;
  return Math.sqrt(a * a + d * d + c * c);
};
CL3D.Vect3d.prototype.getDistanceFromSQ = function(b) {
  var a = b.X - this.X;
  var d = b.Y - this.Y;
  var c = b.Z - this.Z;
  return a * a + d * d + c * c;
};
CL3D.Vect3d.prototype.getLengthSQ = function() {
  return this.X * this.X + this.Y * this.Y + this.Z * this.Z;
};
CL3D.Vect3d.prototype.multiplyWithScal = function(a) {
  return new CL3D.Vect3d(this.X * a, this.Y * a, this.Z * a);
};
CL3D.Vect3d.prototype.multiplyThisWithScal = function(a) {
  this.X *= a;
  this.Y *= a;
  this.Z *= a;
};
CL3D.Vect3d.prototype.multiplyThisWithScalReturnMe = function(a) {
  this.X *= a;
  this.Y *= a;
  this.Z *= a;
  return this;
};
CL3D.Vect3d.prototype.multiplyThisWithVect = function(a) {
  this.X *= a.X;
  this.Y *= a.Y;
  this.Z *= a.Z;
};
CL3D.Vect3d.prototype.multiplyWithVect = function(a) {
  return new CL3D.Vect3d(this.X * a.X, this.Y * a.Y, this.Z * a.Z);
};
CL3D.Vect3d.prototype.divideThisThroughVect = function(a) {
  this.X /= a.X;
  this.Y /= a.Y;
  this.Z /= a.Z;
};
CL3D.Vect3d.prototype.divideThroughVect = function(a) {
  return new CL3D.Vect3d(this.X / a.X, this.Y / a.Y, this.Z / a.Z);
};
CL3D.Vect3d.prototype.crossProduct = function(a) {
  return new CL3D.Vect3d(this.Y * a.Z - this.Z * a.Y, this.Z * a.X - this.X * a.Z, this.X * a.Y - this.Y * a.X);
};
CL3D.Vect3d.prototype.dotProduct = function(a) {
  return this.X * a.X + this.Y * a.Y + this.Z * a.Z;
};
CL3D.Vect3d.prototype.getHorizontalAngle = function() {
  var b = new CL3D.Vect3d;
  b.Y = CL3D.radToDeg(Math.atan2(this.X, this.Z));
  if (b.Y < 0) {
    b.Y += 360;
  }
  if (b.Y >= 360) {
    b.Y -= 360;
  }
  var a = Math.sqrt(this.X * this.X + this.Z * this.Z);
  b.X = CL3D.radToDeg(Math.atan2(a, this.Y)) - 90;
  if (b.X < 0) {
    b.X += 360;
  }
  if (b.X >= 360) {
    b.X -= 360;
  }
  return b;
};
CL3D.Vect3d.prototype.rotateXYBy = function(c) {
  c *= CL3D.DEGTORAD;
  var a = Math.cos(c);
  var b = Math.sin(c);
  this.X = this.X * a - this.Y * b;
  this.Y = this.X * b + this.Y * a;
};
CL3D.Vect3d.prototype.rotateYZBy = function(c) {
  c *= CL3D.DEGTORAD;
  var a = Math.cos(c);
  var b = Math.sin(c);
  this.Y = this.Y * a - this.Z * b;
  this.Z = this.Y * b + this.Z * a;
};
CL3D.Vect3d.prototype.rotateXZBy = function(c) {
  c *= CL3D.DEGTORAD;
  var a = Math.cos(c);
  var b = Math.sin(c);
  this.X = this.X * a - this.Z * b;
  this.Z = this.X * b + this.Z * a;
};
CL3D.Vect3d.prototype.getInterpolated = function(b, c) {
  var a = 1 - c;
  return new CL3D.Vect3d(b.X * a + this.X * c, b.Y * a + this.Y * c, b.Z * a + this.Z * c);
};
CL3D.Vect3d.prototype.toString = function() {
  return "(x: " + this.X + " y:" + this.Y + " z:" + this.Z + ")";
};
CL3D.Line3d = function() {
  this.Start = new CL3D.Vect3d;
  this.End = new CL3D.Vect3d;
};
CL3D.Line3d.prototype.Start = null;
CL3D.Line3d.prototype.End = null;
CL3D.Line3d.prototype.getVector = function() {
  return this.End.substract(this.Start);
};
CL3D.Line3d.prototype.getLength = function() {
  return this.getVector().getLength();
};
CL3D.Vect2d = function(a, b) {
  if (a == null) {
    this.X = 0;
    this.Y = 0;
  } else {
    this.X = a;
    this.Y = b;
  }
};
CL3D.Vect2d.prototype.X = 0;
CL3D.Vect2d.prototype.Y = 0;
CL3D.Vect2d.prototype.set = function(a, b) {
  this.X = a;
  this.Y = b;
};
CL3D.Box3d = function() {
  this.MinEdge = new CL3D.Vect3d;
  this.MaxEdge = new CL3D.Vect3d;
};
CL3D.Box3d.prototype.MinEdge = null;
CL3D.Box3d.prototype.MaxEdge = null;
CL3D.Box3d.prototype.clone = function() {
  var a = new CL3D.Box3d;
  a.MinEdge = this.MinEdge.clone();
  a.MaxEdge = this.MaxEdge.clone();
  return a;
};
CL3D.Box3d.prototype.getCenter = function() {
  var a = this.MinEdge.add(this.MaxEdge);
  a.multiplyThisWithScal(0.5);
  return a;
};
CL3D.Box3d.prototype.getExtent = function() {
  return this.MaxEdge.substract(this.MinEdge);
};
CL3D.Box3d.prototype.getEdges = function() {
  var b = this.getCenter();
  var c = b.substract(this.MaxEdge);
  var a = new Array;
  a.push(new CL3D.Vect3d(b.X + c.X, b.Y + c.Y, b.Z + c.Z));
  a.push(new CL3D.Vect3d(b.X + c.X, b.Y - c.Y, b.Z + c.Z));
  a.push(new CL3D.Vect3d(b.X + c.X, b.Y + c.Y, b.Z - c.Z));
  a.push(new CL3D.Vect3d(b.X + c.X, b.Y - c.Y, b.Z - c.Z));
  a.push(new CL3D.Vect3d(b.X - c.X, b.Y + c.Y, b.Z + c.Z));
  a.push(new CL3D.Vect3d(b.X - c.X, b.Y - c.Y, b.Z + c.Z));
  a.push(new CL3D.Vect3d(b.X - c.X, b.Y + c.Y, b.Z - c.Z));
  a.push(new CL3D.Vect3d(b.X - c.X, b.Y - c.Y, b.Z - c.Z));
  return a;
};
CL3D.Box3d.prototype.intersectsWithLine = function(d, e) {
  var c = e.substract(d);
  var a = c.getLength();
  c.normalize();
  var b = d.add(e).multiplyWithScal(0.5);
  return this.intersectsWithLineImpl(b, c, a * 0.5);
};
CL3D.Box3d.prototype.intersectsWithLineImpl = function(b, a, g) {
  var f = this.getExtent().multiplyWithScal(0.5);
  var c = this.getCenter().substract(b);
  if (Math.abs(c.X) > f.X + g * Math.abs(a.X) || (Math.abs(c.Y) > f.Y + g * Math.abs(a.Y) || Math.abs(c.Z) > f.Z + g * Math.abs(a.Z))) {
    return false;
  }
  var d = f.Y * Math.abs(a.Z) + f.Z * Math.abs(a.Y);
  if (Math.abs(c.Y * a.Z - c.Z * a.Y) > d) {
    return false;
  }
  d = f.X * Math.abs(a.Z) + f.Z * Math.abs(a.X);
  if (Math.abs(c.Z * a.X - c.X * a.Z) > d) {
    return false;
  }
  d = f.X * Math.abs(a.Y) + f.Y * Math.abs(a.X);
  if (Math.abs(c.X * a.Y - c.Y * a.X) > d) {
    return false;
  }
  return true;
};
CL3D.Box3d.prototype.addInternalPoint = function(a, c, b) {
  if (a > this.MaxEdge.X) {
    this.MaxEdge.X = a;
  }
  if (c > this.MaxEdge.Y) {
    this.MaxEdge.Y = c;
  }
  if (b > this.MaxEdge.Z) {
    this.MaxEdge.Z = b;
  }
  if (a < this.MinEdge.X) {
    this.MinEdge.X = a;
  }
  if (c < this.MinEdge.Y) {
    this.MinEdge.Y = c;
  }
  if (b < this.MinEdge.Z) {
    this.MinEdge.Z = b;
  }
};
CL3D.Box3d.prototype.addInternalPointByVector = function(a) {
  this.addInternalPoint(a.X, a.Y, a.Z);
};
CL3D.Box3d.prototype.intersectsWithBox = function(a) {
  return this.MinEdge.X <= a.MaxEdge.X && (this.MinEdge.Y <= a.MaxEdge.Y && (this.MinEdge.Z <= a.MaxEdge.Z && (this.MaxEdge.X >= a.MinEdge.X && (this.MaxEdge.Y >= a.MinEdge.Y && this.MaxEdge.Z >= a.MinEdge.Z))));
};
CL3D.Box3d.prototype.isPointInside = function(a) {
  return a.X >= this.MinEdge.X && (a.X <= this.MaxEdge.X && (a.Y >= this.MinEdge.Y && (a.Y <= this.MaxEdge.Y && (a.Z >= this.MinEdge.Z && a.Z <= this.MaxEdge.Z))));
};
CL3D.Box3d.prototype.reset = function(a, c, b) {
  this.MaxEdge.set(a, c, b);
  this.MinEdge.set(a, c, b);
};
CL3D.Plane3d = function() {
  this.Normal = new CL3D.Vect3d(0, 1, 0);
  this.recalculateD(new CL3D.Vect3d(0, 0, 0));
};
CL3D.Plane3d.prototype.D = 0;
CL3D.Plane3d.prototype.Normal = null;
CL3D.Plane3d.ISREL3D_FRONT = 0;
CL3D.Plane3d.ISREL3D_BACK = 1;
CL3D.Plane3d.ISREL3D_PLANAR = 2;
CL3D.Plane3d.prototype.clone = function() {
  var a = new CL3D.Plane3d(false);
  a.Normal = this.Normal.clone();
  a.D = this.D;
  return a;
};
CL3D.Plane3d.prototype.recalculateD = function(a) {
  this.D = -a.dotProduct(this.Normal);
};
CL3D.Plane3d.prototype.getMemberPoint = function() {
  return this.Normal.multiplyWithScal(-this.D);
};
CL3D.Plane3d.prototype.setPlane = function(a, b) {
  this.Normal = b.clone();
  this.recalculateD(a);
};
CL3D.Plane3d.prototype.setPlaneFrom3Points = function(c, b, a) {
  this.Normal = b.substract(c).crossProduct(a.substract(c));
  this.Normal.normalize();
  this.recalculateD(c);
};
CL3D.Plane3d.prototype.normalize = function() {
  var a = 1 / this.Normal.getLength();
  this.Normal = this.Normal.multiplyWithScal(a);
  this.D *= a;
};
CL3D.Plane3d.prototype.classifyPointRelation = function(a) {
  var b = this.Normal.dotProduct(a) + this.D;
  if (b < -1E-6) {
    return CL3D.Plane3d.ISREL3D_BACK;
  }
  if (b > 1E-6) {
    return CL3D.Plane3d.ISREL3D_FRONT;
  }
  return CL3D.Plane3d.ISREL3D_PLANAR;
};
CL3D.Plane3d.prototype.getIntersectionWithPlanes = function(d, c, b) {
  var a = new CL3D.Vect3d;
  var e = new CL3D.Vect3d;
  if (this.getIntersectionWithPlane(d, a, e)) {
    return c.getIntersectionWithLine(a, e, b);
  }
  return false;
};
CL3D.Plane3d.prototype.getIntersectionWithPlane = function(j, l, g) {
  var f = this.Normal.getLength();
  var e = this.Normal.dotProduct(j.Normal);
  var a = j.Normal.getLength();
  var h = f * a - e * e;
  if (Math.abs(h) < 1E-8) {
    return false;
  }
  var d = 1 / h;
  var k = (a * -this.D + e * j.D) * d;
  var i = (f * -j.D + e * this.D) * d;
  this.Normal.crossProduct(j.Normal).copyTo(g);
  var c = this.Normal.multiplyWithScal(k);
  var b = j.Normal.multiplyWithScal(i);
  c.add(b).copyTo(l);
  return true;
};
CL3D.Plane3d.prototype.getIntersectionWithLine = function(d, e, c) {
  var b = this.Normal.dotProduct(e);
  if (b == 0) {
    return false;
  }
  var a = -(this.Normal.dotProduct(d) + this.D) / b;
  d.add(e.multiplyWithScal(a)).copyTo(c);
  return true;
};
CL3D.Plane3d.prototype.getDistanceTo = function(a) {
  return a.dotProduct(this.Normal) + this.D;
};
CL3D.Plane3d.prototype.isFrontFacing = function(b) {
  var a = this.Normal.dotProduct(b);
  return a <= 0;
};
CL3D.Triangle3d = function(e, d, f) {
  if (e) {
    this.pointA = e;
  } else {
    this.pointA = new CL3D.Vect3d;
  }
  if (d) {
    this.pointB = d;
  } else {
    this.pointB = new CL3D.Vect3d;
  }
  if (f) {
    this.pointC = f;
  } else {
    this.pointC = new CL3D.Vect3d;
  }
};
CL3D.Triangle3d.prototype.pointA = null;
CL3D.Triangle3d.prototype.pointB = null;
CL3D.Triangle3d.prototype.pointC = null;
CL3D.Triangle3d.prototype.clone = function() {
  return new CL3D.Triangle3d(this.pointA, this.pointB, this.pointC);
};
CL3D.Triangle3d.prototype.getPlane = function() {
  var a = new CL3D.Plane3d(false);
  a.setPlaneFrom3Points(this.pointA, this.pointB, this.pointC);
  return a;
};
CL3D.Triangle3d.prototype.isPointInsideFast = function(j) {
  var l = this.pointB.substract(this.pointA);
  var k = this.pointC.substract(this.pointA);
  var v = l.dotProduct(l);
  var t = l.dotProduct(k);
  var q = k.dotProduct(k);
  var i = j.substract(this.pointA);
  var n = i.dotProduct(l);
  var m = i.dotProduct(k);
  var u = n * q - m * t;
  var r = m * v - n * t;
  var h = v * q - t * t;
  var o = u + r - h;
  return o < 0 && !(u < 0 || r < 0);
};
CL3D.Triangle3d.prototype.isPointInside = function(a) {
  return this.isOnSameSide(a, this.pointA, this.pointB, this.pointC) && (this.isOnSameSide(a, this.pointB, this.pointA, this.pointC) && this.isOnSameSide(a, this.pointC, this.pointA, this.pointB));
};
CL3D.Triangle3d.prototype.isOnSameSide = function(i, g, d, c) {
  var e = c.substract(d);
  var h = e.crossProduct(i.substract(d));
  var f = e.crossProduct(g.substract(d));
  return h.dotProduct(f) >= 0;
};
CL3D.Triangle3d.prototype.getNormal = function() {
  return this.pointB.substract(this.pointA).crossProduct(this.pointC.substract(this.pointA));
};
CL3D.Triangle3d.prototype.getIntersectionOfPlaneWithLine = function(c, f) {
  var e = this.getNormal();
  e.normalize();
  var b = e.dotProduct(f);
  if (CL3D.iszero(b)) {
    return null;
  }
  var g = this.pointA.dotProduct(e);
  var a = -(e.dotProduct(c) - g) / b;
  return c.add(f.multiplyWithScal(a));
};
CL3D.Triangle3d.prototype.getIntersectionWithLine = function(b, c) {
  var a = this.getIntersectionOfPlaneWithLine(b, c);
  if (a == null) {
    return null;
  }
  if (this.isPointInside(a)) {
    return a;
  }
  return null;
};
CL3D.Triangle3d.prototype.isTotalInsideBox = function(a) {
  return a.isPointInside(this.pointA) && (a.isPointInside(this.pointB) && a.isPointInside(this.pointC));
};
CL3D.Triangle3d.prototype.copyTo = function(a) {
  this.pointA.copyTo(a.pointA);
  this.pointB.copyTo(a.pointB);
  this.pointC.copyTo(a.pointC);
};
CL3D.Matrix4 = function(a) {
  if (a == null) {
    a = true;
  }
  this.m00 = 0;
  this.m01 = 0;
  this.m02 = 0;
  this.m03 = 0;
  this.m04 = 0;
  this.m05 = 0;
  this.m06 = 0;
  this.m07 = 0;
  this.m08 = 0;
  this.m09 = 0;
  this.m10 = 0;
  this.m11 = 0;
  this.m12 = 0;
  this.m13 = 0;
  this.m14 = 0;
  this.m15 = 0;
  this.bIsIdentity = false;
  if (a) {
    this.m00 = 1;
    this.m05 = 1;
    this.m10 = 1;
    this.m15 = 1;
    this.bIsIdentity = true;
  }
};
CL3D.Matrix4.prototype.makeIdentity = function() {
  this.m00 = 1;
  this.m01 = 0;
  this.m02 = 0;
  this.m03 = 0;
  this.m04 = 0;
  this.m05 = 1;
  this.m06 = 0;
  this.m07 = 0;
  this.m08 = 0;
  this.m09 = 0;
  this.m10 = 1;
  this.m11 = 0;
  this.m12 = 0;
  this.m13 = 0;
  this.m14 = 0;
  this.m15 = 1;
  this.bIsIdentity = true;
};
CL3D.Matrix4.prototype.isIdentity = function() {
  if (this.bIsIdentity) {
    return true;
  }
  this.bIsIdentity = CL3D.isone(this.m00) && (CL3D.iszero(this.m01) && (CL3D.iszero(this.m02) && (CL3D.iszero(this.m03) && (CL3D.iszero(this.m04) && (CL3D.isone(this.m05) && (CL3D.iszero(this.m06) && (CL3D.iszero(this.m07) && (CL3D.iszero(this.m08) && (CL3D.iszero(this.m09) && (CL3D.isone(this.m10) && (CL3D.iszero(this.m11) && (CL3D.iszero(this.m12) && (CL3D.iszero(this.m13) && (CL3D.iszero(this.m14) && CL3D.isone(this.m15)))))))))))))));
  return this.bIsIdentity;
};
CL3D.Matrix4.prototype.isTranslateOnly = function() {
  if (this.bIsIdentity) {
    return true;
  }
  return CL3D.isone(this.m00) && (CL3D.iszero(this.m01) && (CL3D.iszero(this.m02) && (CL3D.iszero(this.m03) && (CL3D.iszero(this.m04) && (CL3D.isone(this.m05) && (CL3D.iszero(this.m06) && (CL3D.iszero(this.m07) && (CL3D.iszero(this.m08) && (CL3D.iszero(this.m09) && (CL3D.isone(this.m10) && (CL3D.iszero(this.m11) && CL3D.isone(this.m15))))))))))));
};
CL3D.Matrix4.prototype.equals = function(a) {
  return CL3D.equals(this.m00, a.m00) && (CL3D.equals(this.m01, a.m01) && (CL3D.equals(this.m02, a.m02) && (CL3D.equals(this.m03, a.m03) && (CL3D.equals(this.m04, a.m04) && (CL3D.equals(this.m05, a.m05) && (CL3D.equals(this.m06, a.m06) && (CL3D.equals(this.m07, a.m07) && (CL3D.equals(this.m08, a.m08) && (CL3D.equals(this.m09, a.m09) && (CL3D.equals(this.m10, a.m10) && (CL3D.equals(this.m11, a.m11) && (CL3D.equals(this.m12, a.m12) && (CL3D.equals(this.m13, a.m13) && (CL3D.equals(this.m14, a.m14) && 
  CL3D.equals(this.m15, a.m15)))))))))))))));
};
CL3D.Matrix4.prototype.getTranslation = function() {
  return new CL3D.Vect3d(this.m12, this.m13, this.m14);
};
CL3D.Matrix4.prototype.getScale = function() {
  return new CL3D.Vect3d(this.m00, this.m05, this.m10);
};
CL3D.Matrix4.prototype.rotateVect = function(a) {
  var b = a.clone();
  a.X = b.X * this.m00 + b.Y * this.m04 + b.Z * this.m08;
  a.Y = b.X * this.m01 + b.Y * this.m05 + b.Z * this.m09;
  a.Z = b.X * this.m02 + b.Y * this.m06 + b.Z * this.m10;
};
CL3D.Matrix4.prototype.rotateVect2 = function(a, b) {
  a.X = b.X * this.m00 + b.Y * this.m04 + b.Z * this.m08;
  a.Y = b.X * this.m01 + b.Y * this.m05 + b.Z * this.m09;
  a.Z = b.X * this.m02 + b.Y * this.m06 + b.Z * this.m10;
};
CL3D.Matrix4.prototype.inverseRotateVect = function(a) {
  var b = a.clone();
  a.X = b.X * this.m00 + b.Y * this.m01 + b.Z * this.m02;
  a.Y = b.X * this.m04 + b.Y * this.m05 + b.Z * this.m06;
  a.Z = b.X * this.m08 + b.Y * this.m09 + b.Z * this.m10;
};
CL3D.Matrix4.prototype.getRotatedVect = function(a) {
  return new CL3D.Vect3d(a.X * this.m00 + a.Y * this.m04 + a.Z * this.m08, a.X * this.m01 + a.Y * this.m05 + a.Z * this.m09, a.X * this.m02 + a.Y * this.m06 + a.Z * this.m10);
};
CL3D.Matrix4.prototype.getTransformedVect = function(a) {
  return new CL3D.Vect3d(a.X * this.m00 + a.Y * this.m04 + a.Z * this.m08 + this.m12, a.X * this.m01 + a.Y * this.m05 + a.Z * this.m09 + this.m13, a.X * this.m02 + a.Y * this.m06 + a.Z * this.m10 + this.m14);
};
CL3D.Matrix4.prototype.transformVect = function(c) {
  var b = c.X * this.m00 + c.Y * this.m04 + c.Z * this.m08 + this.m12;
  var a = c.X * this.m01 + c.Y * this.m05 + c.Z * this.m09 + this.m13;
  var d = c.X * this.m02 + c.Y * this.m06 + c.Z * this.m10 + this.m14;
  c.X = b;
  c.Y = a;
  c.Z = d;
};
CL3D.Matrix4.prototype.transformVect2 = function(a, b) {
  a.X = b.X * this.m00 + b.Y * this.m04 + b.Z * this.m08 + this.m12;
  a.Y = b.X * this.m01 + b.Y * this.m05 + b.Z * this.m09 + this.m13;
  a.Z = b.X * this.m02 + b.Y * this.m06 + b.Z * this.m10 + this.m14;
};
CL3D.Matrix4.prototype.getTranslatedVect = function(a) {
  return new CL3D.Vect3d(a.X + this.m12, a.Y + this.m13, a.Z + this.m14);
};
CL3D.Matrix4.prototype.translateVect = function(a) {
  a.X = a.X + this.m12;
  a.Y = a.Y + this.m13;
  a.Z = a.Z + this.m14;
};
CL3D.Matrix4.prototype.transformPlane = function(a) {
  var d = a.getMemberPoint();
  this.transformVect(d);
  var b = a.Normal.clone();
  b.normalize();
  var c = this.getScale();
  if (!CL3D.equals(c.X, 0) && (!CL3D.equals(c.Y, 0) && (!CL3D.equals(c.Z, 0) && (!CL3D.equals(c.X, 1) || (!CL3D.equals(c.Y, 1) || !CL3D.equals(c.Z, 1)))))) {
    b.X *= 1 / (c.X * c.X);
    b.Y *= 1 / (c.Y * c.Y);
    b.Z *= 1 / (c.Z * c.Z);
  }
  this.rotateVect(b);
  b.normalize();
  a.setPlane(d, b);
};
CL3D.Matrix4.prototype.multiply = function(a) {
  var b = new CL3D.Matrix4(false);
  if (this.bIsIdentity) {
    a.copyTo(b);
    return b;
  }
  if (a.bIsIdentity) {
    this.copyTo(b);
    return b;
  }
  b.m00 = this.m00 * a.m00 + this.m04 * a.m01 + this.m08 * a.m02 + this.m12 * a.m03;
  b.m01 = this.m01 * a.m00 + this.m05 * a.m01 + this.m09 * a.m02 + this.m13 * a.m03;
  b.m02 = this.m02 * a.m00 + this.m06 * a.m01 + this.m10 * a.m02 + this.m14 * a.m03;
  b.m03 = this.m03 * a.m00 + this.m07 * a.m01 + this.m11 * a.m02 + this.m15 * a.m03;
  b.m04 = this.m00 * a.m04 + this.m04 * a.m05 + this.m08 * a.m06 + this.m12 * a.m07;
  b.m05 = this.m01 * a.m04 + this.m05 * a.m05 + this.m09 * a.m06 + this.m13 * a.m07;
  b.m06 = this.m02 * a.m04 + this.m06 * a.m05 + this.m10 * a.m06 + this.m14 * a.m07;
  b.m07 = this.m03 * a.m04 + this.m07 * a.m05 + this.m11 * a.m06 + this.m15 * a.m07;
  b.m08 = this.m00 * a.m08 + this.m04 * a.m09 + this.m08 * a.m10 + this.m12 * a.m11;
  b.m09 = this.m01 * a.m08 + this.m05 * a.m09 + this.m09 * a.m10 + this.m13 * a.m11;
  b.m10 = this.m02 * a.m08 + this.m06 * a.m09 + this.m10 * a.m10 + this.m14 * a.m11;
  b.m11 = this.m03 * a.m08 + this.m07 * a.m09 + this.m11 * a.m10 + this.m15 * a.m11;
  b.m12 = this.m00 * a.m12 + this.m04 * a.m13 + this.m08 * a.m14 + this.m12 * a.m15;
  b.m13 = this.m01 * a.m12 + this.m05 * a.m13 + this.m09 * a.m14 + this.m13 * a.m15;
  b.m14 = this.m02 * a.m12 + this.m06 * a.m13 + this.m10 * a.m14 + this.m14 * a.m15;
  b.m15 = this.m03 * a.m12 + this.m07 * a.m13 + this.m11 * a.m14 + this.m15 * a.m15;
  return b;
};
CL3D.Matrix4.prototype.multiplyWith1x4Matrix = function(a) {
  var b = a.clone();
  b.W = a.W;
  a.X = b.X * this.m00 + b.Y * this.m04 + b.Z * this.m08 + b.W * this.m12;
  a.Y = b.X * this.m01 + b.Y * this.m05 + b.Z * this.m09 + b.W * this.m13;
  a.Z = b.X * this.m02 + b.Y * this.m06 + b.Z * this.m10 + b.W * this.m14;
  a.W = b.X * this.m03 + b.Y * this.m07 + b.Z * this.m11 + b.W * this.m15;
};
CL3D.Matrix4.prototype.multiplyWith1x4Matrix2 = function(b) {
  var a = b.X;
  var d = b.Y;
  var c = b.Z;
  b.X = a * this.m00 + d * this.m04 + c * this.m08 + this.m12;
  b.Y = a * this.m01 + d * this.m05 + c * this.m09 + this.m13;
  b.Z = a * this.m02 + d * this.m06 + c * this.m10 + this.m14;
  return a * this.m03 + d * this.m07 + c * this.m11 + this.m15;
};
CL3D.Matrix4.prototype.getInverse = function(a) {
  if (this.bIsIdentity) {
    this.copyTo(a);
    return true;
  }
  var b = (this.m00 * this.m05 - this.m01 * this.m04) * (this.m10 * this.m15 - this.m11 * this.m14) - (this.m00 * this.m06 - this.m02 * this.m04) * (this.m09 * this.m15 - this.m11 * this.m13) + (this.m00 * this.m07 - this.m03 * this.m04) * (this.m09 * this.m14 - this.m10 * this.m13) + (this.m01 * this.m06 - this.m02 * this.m05) * (this.m08 * this.m15 - this.m11 * this.m12) - (this.m01 * this.m07 - this.m03 * this.m05) * (this.m08 * this.m14 - this.m10 * this.m12) + (this.m02 * this.m07 - this.m03 * 
  this.m06) * (this.m08 * this.m13 - this.m09 * this.m12);
  if (b > -1E-7 && b < 1E-7) {
    return false;
  }
  b = 1 / b;
  a.m00 = b * (this.m05 * (this.m10 * this.m15 - this.m11 * this.m14) + this.m06 * (this.m11 * this.m13 - this.m09 * this.m15) + this.m07 * (this.m09 * this.m14 - this.m10 * this.m13));
  a.m01 = b * (this.m09 * (this.m02 * this.m15 - this.m03 * this.m14) + this.m10 * (this.m03 * this.m13 - this.m01 * this.m15) + this.m11 * (this.m01 * this.m14 - this.m02 * this.m13));
  a.m02 = b * (this.m13 * (this.m02 * this.m07 - this.m03 * this.m06) + this.m14 * (this.m03 * this.m05 - this.m01 * this.m07) + this.m15 * (this.m01 * this.m06 - this.m02 * this.m05));
  a.m03 = b * (this.m01 * (this.m07 * this.m10 - this.m06 * this.m11) + this.m02 * (this.m05 * this.m11 - this.m07 * this.m09) + this.m03 * (this.m06 * this.m09 - this.m05 * this.m10));
  a.m04 = b * (this.m06 * (this.m08 * this.m15 - this.m11 * this.m12) + this.m07 * (this.m10 * this.m12 - this.m08 * this.m14) + this.m04 * (this.m11 * this.m14 - this.m10 * this.m15));
  a.m05 = b * (this.m10 * (this.m00 * this.m15 - this.m03 * this.m12) + this.m11 * (this.m02 * this.m12 - this.m00 * this.m14) + this.m08 * (this.m03 * this.m14 - this.m02 * this.m15));
  a.m06 = b * (this.m14 * (this.m00 * this.m07 - this.m03 * this.m04) + this.m15 * (this.m02 * this.m04 - this.m00 * this.m06) + this.m12 * (this.m03 * this.m06 - this.m02 * this.m07));
  a.m07 = b * (this.m02 * (this.m07 * this.m08 - this.m04 * this.m11) + this.m03 * (this.m04 * this.m10 - this.m06 * this.m08) + this.m00 * (this.m06 * this.m11 - this.m07 * this.m10));
  a.m08 = b * (this.m07 * (this.m08 * this.m13 - this.m09 * this.m12) + this.m04 * (this.m09 * this.m15 - this.m11 * this.m13) + this.m05 * (this.m11 * this.m12 - this.m08 * this.m15));
  a.m09 = b * (this.m11 * (this.m00 * this.m13 - this.m01 * this.m12) + this.m08 * (this.m01 * this.m15 - this.m03 * this.m13) + this.m09 * (this.m03 * this.m12 - this.m00 * this.m15));
  a.m10 = b * (this.m15 * (this.m00 * this.m05 - this.m01 * this.m04) + this.m12 * (this.m01 * this.m07 - this.m03 * this.m05) + this.m13 * (this.m03 * this.m04 - this.m00 * this.m07));
  a.m11 = b * (this.m03 * (this.m05 * this.m08 - this.m04 * this.m09) + this.m00 * (this.m07 * this.m09 - this.m05 * this.m11) + this.m01 * (this.m04 * this.m11 - this.m07 * this.m08));
  a.m12 = b * (this.m04 * (this.m10 * this.m13 - this.m09 * this.m14) + this.m05 * (this.m08 * this.m14 - this.m10 * this.m12) + this.m06 * (this.m09 * this.m12 - this.m08 * this.m13));
  a.m13 = b * (this.m08 * (this.m02 * this.m13 - this.m01 * this.m14) + this.m09 * (this.m00 * this.m14 - this.m02 * this.m12) + this.m10 * (this.m01 * this.m12 - this.m00 * this.m13));
  a.m14 = b * (this.m12 * (this.m02 * this.m05 - this.m01 * this.m06) + this.m13 * (this.m00 * this.m06 - this.m02 * this.m04) + this.m14 * (this.m01 * this.m04 - this.m00 * this.m05));
  a.m15 = b * (this.m00 * (this.m05 * this.m10 - this.m06 * this.m09) + this.m01 * (this.m06 * this.m08 - this.m04 * this.m10) + this.m02 * (this.m04 * this.m09 - this.m05 * this.m08));
  a.bIsIdentity = this.bIsIdentity;
  return true;
};
CL3D.Matrix4.prototype.makeInverse = function() {
  var a = new CL3D.Matrix4(false);
  if (this.getInverse(a)) {
    a.copyTo(this);
    return true;
  }
  return false;
};
CL3D.Matrix4.prototype.getTransposed = function() {
  var a = new CL3D.Matrix4(false);
  a.m00 = this.m00;
  a.m01 = this.m04;
  a.m02 = this.m08;
  a.m03 = this.m12;
  a.m04 = this.m01;
  a.m05 = this.m05;
  a.m06 = this.m09;
  a.m07 = this.m13;
  a.m08 = this.m02;
  a.m09 = this.m06;
  a.m10 = this.m10;
  a.m11 = this.m14;
  a.m12 = this.m03;
  a.m13 = this.m07;
  a.m14 = this.m11;
  a.m15 = this.m15;
  a.bIsIdentity = this.bIsIdentity;
  return a;
};
CL3D.Matrix4.prototype.asArray = function() {
  return[this.m00, this.m01, this.m02, this.m03, this.m04, this.m05, this.m06, this.m07, this.m08, this.m09, this.m10, this.m11, this.m12, this.m13, this.m14, this.m15];
};
CL3D.Matrix4.prototype.setByIndex = function(a, b) {
  this.bIsIdentity = false;
  switch(a) {
    case 0:
      this.m00 = b;
      break;
    case 1:
      this.m01 = b;
      break;
    case 2:
      this.m02 = b;
      break;
    case 3:
      this.m03 = b;
      break;
    case 4:
      this.m04 = b;
      break;
    case 5:
      this.m05 = b;
      break;
    case 6:
      this.m06 = b;
      break;
    case 7:
      this.m07 = b;
      break;
    case 8:
      this.m08 = b;
      break;
    case 9:
      this.m09 = b;
      break;
    case 10:
      this.m10 = b;
      break;
    case 11:
      this.m11 = b;
      break;
    case 12:
      this.m12 = b;
      break;
    case 13:
      this.m13 = b;
      break;
    case 14:
      this.m14 = b;
      break;
    case 15:
      this.m15 = b;
      break;
  }
};
CL3D.Matrix4.prototype.clone = function() {
  var a = new CL3D.Matrix4(false);
  this.copyTo(a);
  return a;
};
CL3D.Matrix4.prototype.copyTo = function(a) {
  a.m00 = this.m00;
  a.m01 = this.m01;
  a.m02 = this.m02;
  a.m03 = this.m03;
  a.m04 = this.m04;
  a.m05 = this.m05;
  a.m06 = this.m06;
  a.m07 = this.m07;
  a.m08 = this.m08;
  a.m09 = this.m09;
  a.m10 = this.m10;
  a.m11 = this.m11;
  a.m12 = this.m12;
  a.m13 = this.m13;
  a.m14 = this.m14;
  a.m15 = this.m15;
  a.bIsIdentity = this.bIsIdentity;
};
CL3D.Matrix4.prototype.buildProjectionMatrixPerspectiveFovLH = function(e, d, f, c) {
  var b = 1 / Math.tan(e / 2);
  var a = b / d;
  this.m00 = a;
  this.m01 = 0;
  this.m02 = 0;
  this.m03 = 0;
  this.m04 = 0;
  this.m05 = b;
  this.m06 = 0;
  this.m07 = 0;
  this.m08 = 0;
  this.m09 = 0;
  this.m10 = c / (c - f);
  this.m11 = 1;
  this.m12 = 0;
  this.m13 = 0;
  this.m14 = -f * c / (c - f);
  this.m15 = 0;
  this.bIsIdentity = false;
};
CL3D.Matrix4.prototype.buildCameraLookAtMatrixLH = function(b, e, d) {
  var a = e.substract(b);
  a.normalize();
  var f = d.crossProduct(a);
  f.normalize();
  var c = a.crossProduct(f);
  this.m00 = f.X;
  this.m01 = c.X;
  this.m02 = a.X;
  this.m03 = 0;
  this.m04 = f.Y;
  this.m05 = c.Y;
  this.m06 = a.Y;
  this.m07 = 0;
  this.m08 = f.Z;
  this.m09 = c.Z;
  this.m10 = a.Z;
  this.m11 = 0;
  this.m12 = -f.dotProduct(b);
  this.m13 = -c.dotProduct(b);
  this.m14 = -a.dotProduct(b);
  this.m15 = 1;
  this.bIsIdentity = false;
};
CL3D.Matrix4.prototype.setRotationDegrees = function(a) {
  this.setRotationRadians(a.multiplyWithScal(CL3D.DEGTORAD));
};
CL3D.Matrix4.prototype.setRotationRadians = function(i) {
  var e = Math.cos(i.X);
  var a = Math.sin(i.X);
  var f = Math.cos(i.Y);
  var c = Math.sin(i.Y);
  var d = Math.cos(i.Z);
  var g = Math.sin(i.Z);
  this.m00 = f * d;
  this.m01 = f * g;
  this.m02 = -c;
  var h = a * c;
  var b = e * c;
  this.m04 = h * d - e * g;
  this.m05 = h * g + e * d;
  this.m06 = a * f;
  this.m08 = b * d + a * g;
  this.m09 = b * g - a * d;
  this.m10 = e * f;
  this.bIsIdentity = false;
};
CL3D.Matrix4.prototype.getRotationDegrees = function() {
  var f = -Math.asin(this.m02);
  var e = Math.cos(f);
  f *= CL3D.RADTODEG;
  var c;
  var a;
  var g;
  var d;
  if (Math.abs(e) > 1E-8) {
    var b = 1 / e;
    c = this.m10 * b;
    a = this.m06 * b;
    g = Math.atan2(a, c) * CL3D.RADTODEG;
    c = this.m00 * b;
    a = this.m01 * b;
    d = Math.atan2(a, c) * CL3D.RADTODEG;
  } else {
    g = 0;
    c = this.m05;
    a = -this.m04;
    d = Math.atan2(a, c) * CL3D.RADTODEG;
  }
  if (g < 0) {
    g += 360;
  }
  if (f < 0) {
    f += 360;
  }
  if (d < 0) {
    d += 360;
  }
  return new CL3D.Vect3d(g, f, d);
};
CL3D.Matrix4.prototype.setTranslation = function(a) {
  this.m12 = a.X;
  this.m13 = a.Y;
  this.m14 = a.Z;
  this.bIsIdentity = false;
};
CL3D.Matrix4.prototype.setScale = function(a) {
  this.m00 = a.X;
  this.m05 = a.Y;
  this.m10 = a.Z;
  this.bIsIdentity = false;
};
CL3D.Matrix4.prototype.setScaleXYZ = function(a, c, b) {
  this.m00 = a;
  this.m05 = c;
  this.m10 = b;
  this.bIsIdentity = false;
};
CL3D.Matrix4.prototype.transformBoxEx = function(d) {
  var b = d.getEdges();
  var c;
  for (c = 0;c < 8;++c) {
    this.transformVect(b[c]);
  }
  var a = b[0];
  d.MinEdge = a.clone();
  d.MaxEdge = a.clone();
  for (c = 1;c < 8;++c) {
    d.addInternalPointByVector(b[c]);
  }
};
CL3D.Matrix4.prototype.transformBoxEx2 = function(h) {
  var f = [h.MinEdge.X, h.MinEdge.Y, h.MinEdge.Z];
  var n = [h.MaxEdge.X, h.MaxEdge.Y, h.MaxEdge.Z];
  var d = [this.m12, this.m13, this.m14];
  var k = [this.m12, this.m13, this.m14];
  var c = this.asArray();
  for (var g = 0;g < 3;++g) {
    for (var e = 0;e < 3;++e) {
      var o = c[e * 4 + g];
      var m = o * f[e];
      var l = o * n[e];
      if (m < l) {
        d[g] += m;
        k[g] += l;
      } else {
        d[g] += l;
        k[g] += m;
      }
    }
  }
  h.MinEdge.X = d[0];
  h.MinEdge.Y = d[1];
  h.MinEdge.Z = d[2];
  h.MaxEdge.X = k[0];
  h.MaxEdge.Y = k[1];
  h.MaxEdge.Z = k[2];
};
CL3D.Matrix4.prototype.toString = function() {
  return this.m00 + " " + this.m01 + " " + this.m02 + " " + this.m03 + "\n" + this.m04 + " " + this.m05 + " " + this.m06 + " " + this.m07 + "\n" + this.m08 + " " + this.m09 + " " + this.m10 + " " + this.m11 + "\n" + this.m12 + " " + this.m13 + " " + this.m14 + " " + this.m15;
};
CL3D.Quaternion = function(a, d, c, b) {
  this.X = 0;
  this.Y = 0;
  this.Z = 0;
  this.W = 1;
  if (a != null) {
    this.X = a;
  }
  if (d != null) {
    this.Y = d;
  }
  if (c != null) {
    this.Z = c;
  }
  if (b != null) {
    this.W = b;
  }
};
CL3D.Quaternion.prototype.X = 0;
CL3D.Quaternion.prototype.Y = 0;
CL3D.Quaternion.prototype.Z = 0;
CL3D.Quaternion.prototype.W = 0;
CL3D.Quaternion.prototype.clone = function() {
  var a = new CL3D.Quaternion;
  this.copyTo(a);
  return a;
};
CL3D.Quaternion.prototype.copyTo = function(a) {
  a.X = this.X;
  a.Y = this.Y;
  a.Z = this.Z;
  a.W = this.W;
};
CL3D.Quaternion.prototype.multiplyWith = function(a) {
  return new CL3D.Quaternion(this.X * a, this.Y * a, this.Z * a, this.W * a);
};
CL3D.Quaternion.prototype.multiplyThisWith = function(a) {
  this.X = this.X * a;
  this.Y = this.Y * a;
  this.Z = this.Z * a;
  this.W = this.W * a;
};
CL3D.Quaternion.prototype.addToThis = function(a) {
  this.X += a.X;
  this.Y += a.Y;
  this.Z += a.Z;
  this.W += a.W;
  return this;
};
CL3D.Quaternion.prototype.slerp = function(g, f, b) {
  var c = g.dotProduct(f);
  if (c < 0) {
    g = g.multiplyWith(-1);
    c *= -1;
  }
  var d;
  var e;
  if (c + 1 > 0.05) {
    if (1 - c >= 0.05) {
      var a = Math.acos(c);
      var i = 1 / Math.sin(a);
      d = Math.sin(a * (1 - b)) * i;
      e = Math.sin(a * b) * i;
    } else {
      d = 1 - b;
      e = b;
    }
  } else {
    f = new CL3D.Quaternion(-g.Y, g.X, -g.W, g.Z);
    d = Math.sin(CL3D.PI * (0.5 - b));
    e = Math.sin(CL3D.PI * b);
  }
  var h = g.multiplyWith(d).addToThis(f.multiplyWith(e));
  this.X = h.X;
  this.Y = h.Y;
  this.Z = h.Z;
  this.W = h.W;
};
CL3D.Quaternion.prototype.dotProduct = function(a) {
  return this.X * a.X + this.Y * a.Y + this.Z * a.Z + this.W * a.W;
};
CL3D.Quaternion.prototype.getMatrix = function() {
  var a = new CL3D.Matrix4(false);
  this.getMatrix_transposed(a);
  return a;
};
CL3D.Quaternion.prototype.getMatrix_transposed = function(b) {
  var e = this.X;
  var d = this.Y;
  var c = this.Z;
  var a = this.W;
  b.m00 = 1 - 2 * d * d - 2 * c * c;
  b.m04 = 2 * e * d + 2 * c * a;
  b.m08 = 2 * e * c - 2 * d * a;
  b.m12 = 0;
  b.m01 = 2 * e * d - 2 * c * a;
  b.m05 = 1 - 2 * e * e - 2 * c * c;
  b.m09 = 2 * c * d + 2 * e * a;
  b.m13 = 0;
  b.m02 = 2 * e * c + 2 * d * a;
  b.m06 = 2 * c * d - 2 * e * a;
  b.m10 = 1 - 2 * e * e - 2 * d * d;
  b.m14 = 0;
  b.m03 = 0;
  b.m07 = 0;
  b.m11 = 0;
  b.m15 = 1;
  b.bIsIdentity = false;
};
CL3D.Quaternion.prototype.toEuler = function(a) {
  var e = this.W * this.W;
  var d = this.X * this.X;
  var c = this.Y * this.Y;
  var b = this.Z * this.Z;
  a.Z = Math.atan2(2 * (this.X * this.Y + this.Z * this.W), d - c - b + e);
  a.X = Math.atan2(2 * (this.Y * this.Z + this.X * this.W), -d - c + b + e);
  a.Y = Math.asin(CL3D.clamp(-2 * (this.X * this.Z - this.Y * this.W), -1, 1));
};
CL3D.Quaternion.prototype.setFromEuler = function(m, l, i) {
  var f = m * 0.5;
  var a = Math.sin(f);
  var g = Math.cos(f);
  f = l * 0.5;
  var c = Math.sin(f);
  var j = Math.cos(f);
  f = i * 0.5;
  var k = Math.sin(f);
  var e = Math.cos(f);
  var n = j * e;
  var h = c * e;
  var d = j * k;
  var b = c * k;
  this.X = a * n - g * b;
  this.Y = g * h + a * d;
  this.Z = g * d - a * h;
  this.W = g * n + a * b;
  this.normalize();
};
CL3D.Quaternion.prototype.normalize = function() {
  var a = this.X * this.X + this.Y * this.Y + this.Z * this.Z + this.W * this.W;
  if (a == 1) {
    return;
  }
  a = 1 / Math.sqrt(a);
  this.multiplyThisWith(a);
};
CL3D.Quaternion.prototype.toString = function() {
  return "(x: " + this.X + " y:" + this.Y + " z:" + this.Z + " w:" + this.W + ")";
};
CL3D.ViewFrustrum = function() {
  this.planes = new Array;
  for (var a = 0;a < CL3D.ViewFrustrum.VF_PLANE_COUNT;++a) {
    this.planes.push(new CL3D.Plane3d);
  }
};
CL3D.ViewFrustrum.prototype.planes = null;
CL3D.ViewFrustrum.VF_FAR_PLANE = 0;
CL3D.ViewFrustrum.VF_NEAR_PLANE = 1;
CL3D.ViewFrustrum.VF_LEFT_PLANE = 2;
CL3D.ViewFrustrum.VF_RIGHT_PLANE = 3;
CL3D.ViewFrustrum.VF_BOTTOM_PLANE = 4;
CL3D.ViewFrustrum.VF_TOP_PLANE = 5;
CL3D.ViewFrustrum.VF_PLANE_COUNT = 6;
CL3D.ViewFrustrum.prototype.setFrom = function(d) {
  var b;
  b = this.planes[CL3D.ViewFrustrum.VF_LEFT_PLANE];
  b.Normal.X = d.m03 + d.m00;
  b.Normal.Y = d.m07 + d.m04;
  b.Normal.Z = d.m11 + d.m08;
  b.D = d.m15 + d.m12;
  b = this.planes[CL3D.ViewFrustrum.VF_RIGHT_PLANE];
  b.Normal.X = d.m03 - d.m00;
  b.Normal.Y = d.m07 - d.m04;
  b.Normal.Z = d.m11 - d.m08;
  b.D = d.m15 - d.m12;
  b = this.planes[CL3D.ViewFrustrum.VF_TOP_PLANE];
  b.Normal.X = d.m03 - d.m01;
  b.Normal.Y = d.m07 - d.m05;
  b.Normal.Z = d.m11 - d.m09;
  b.D = d.m15 - d.m13;
  b = this.planes[CL3D.ViewFrustrum.VF_BOTTOM_PLANE];
  b.Normal.X = d.m03 + d.m01;
  b.Normal.Y = d.m07 + d.m05;
  b.Normal.Z = d.m11 + d.m09;
  b.D = d.m15 + d.m13;
  b = this.planes[CL3D.ViewFrustrum.VF_FAR_PLANE];
  b.Normal.X = d.m03 - d.m02;
  b.Normal.Y = d.m07 - d.m06;
  b.Normal.Z = d.m11 - d.m10;
  b.D = d.m15 - d.m14;
  b = this.planes[CL3D.ViewFrustrum.VF_NEAR_PLANE];
  b.Normal.X = d.m02;
  b.Normal.Y = d.m06;
  b.Normal.Z = d.m10;
  b.D = d.m14;
  var c = 0;
  for (c = 0;c < CL3D.ViewFrustrum.VF_PLANE_COUNT;++c) {
    b = this.planes[c];
    var a = -(1 / b.Normal.getLength());
    b.Normal = b.Normal.multiplyWithScal(a);
    b.D *= a;
  }
};
CL3D.ViewFrustrum.prototype.getFarLeftUp = function() {
  var a = new CL3D.Vect3d;
  this.planes[CL3D.ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(this.planes[CL3D.ViewFrustrum.VF_TOP_PLANE], this.planes[CL3D.ViewFrustrum.VF_LEFT_PLANE], a);
  return a;
};
CL3D.ViewFrustrum.prototype.getFarRightUp = function() {
  var a = new CL3D.Vect3d;
  this.planes[CL3D.ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(this.planes[CL3D.ViewFrustrum.VF_TOP_PLANE], this.planes[CL3D.ViewFrustrum.VF_RIGHT_PLANE], a);
  return a;
};
CL3D.ViewFrustrum.prototype.getFarRightDown = function() {
  var a = new CL3D.Vect3d;
  this.planes[CL3D.ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(this.planes[CL3D.ViewFrustrum.VF_BOTTOM_PLANE], this.planes[CL3D.ViewFrustrum.VF_RIGHT_PLANE], a);
  return a;
};
CL3D.ViewFrustrum.prototype.getFarLeftDown = function() {
  var a = new CL3D.Vect3d;
  this.planes[CL3D.ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(this.planes[CL3D.ViewFrustrum.VF_BOTTOM_PLANE], this.planes[CL3D.ViewFrustrum.VF_LEFT_PLANE], a);
  return a;
};
CL3D.ViewFrustrum.prototype.getBoundingBox = function(c) {
  var a = new CL3D.Box3d;
  a.reset(c.X, c.Y, c.Z);
  a.addInternalPointByVector(this.getFarLeftUp());
  a.addInternalPointByVector(this.getFarRightUp());
  a.addInternalPointByVector(this.getFarLeftDown());
  a.addInternalPointByVector(this.getFarRightDown());
  return a;
};
CL3D.ViewFrustrum.prototype.isBoxInside = function(d) {
  var a = d.getEdges();
  for (var e = 0;e < 6;++e) {
    var c = false;
    for (var b = 0;b < 8;++b) {
      if (this.planes[e].classifyPointRelation(a[b]) != CL3D.Plane3d.ISREL3D_FRONT) {
        c = true;
        break;
      }
    }
    if (!c) {
      return false;
    }
  }
  return true;
};
CL3D.Vertex3D = function(a) {
  if (a) {
    this.Pos = new CL3D.Vect3d;
    this.Normal = new CL3D.Vect3d;
    this.Color = 4294967295;
    this.TCoords = new CL3D.Vect2d;
    this.TCoords2 = new CL3D.Vect2d;
  }
};
CL3D.Vertex3D.prototype.Pos = null;
CL3D.Vertex3D.prototype.Normal = null;
CL3D.Vertex3D.prototype.Color = 0;
CL3D.Vertex3D.prototype.TCoords = null;
CL3D.Vertex3D.prototype.TCoords2 = null;
CL3D.Texture = function() {
  this.Name = "";
  this.Loaded = false;
  this.Image = null;
  this.Texture = null;
  this.CachedWidth = null;
  this.CachedHeight = null;
  this.OriginalWidth = null;
  this.OriginalHeight = null;
};
CL3D.Texture.prototype.getImage = function() {
  return this.Image;
};
CL3D.Texture.prototype.getWebGLTexture = function() {
  return this.Texture;
};
CL3D.Texture.prototype.getWidth = function() {
  if (this.Image) {
    return this.Image.width;
  }
  if (this.CachedWidth != null) {
    return this.CachedWidth;
  }
  return 0;
};
CL3D.Texture.prototype.getHeight = function() {
  if (this.Image) {
    return this.Image.height;
  }
  if (this.CachedHeight != null) {
    return this.CachedHeight;
  }
  return 0;
};
CL3D.Texture.prototype.getURL = function() {
  return this.Name;
};
CL3D.Texture.prototype.isLoaded = function() {
  return this.Loaded;
};
CL3D.Action = function() {
};
CL3D.Action.prototype.execute = function(a, b) {
};
CL3D.Action.prototype.createClone = function(a, b) {
  return null;
};
CL3D.Action.SetOverlayText = function() {
  this.Text = "";
  this.SceneNodeToChange = null;
  this.ChangeCurrentSceneNode = false;
  this.Type = "SetOverlayText";
};
CL3D.Action.SetOverlayText.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.SetOverlayText;
  b.Text = this.Text;
  b.SceneNodeToChange = this.SceneNodeToChange;
  b.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
  if (b.SceneNodeToChange == c) {
    b.SceneNodeToChange = d;
  }
  return b;
};
CL3D.Action.SetOverlayText.prototype.execute = function(a, h) {
  if (!a || !h) {
    return;
  }
  var j = null;
  if (this.ChangeCurrentSceneNode) {
    j = a;
  } else {
    if (this.SceneNodeToChange != -1) {
      j = h.getSceneNodeFromId(this.SceneNodeToChange);
    }
  }
  if (j && j.setText) {
    var g = this.Text.indexOf("$");
    if (g != -1) {
      var c = this.Text;
      var e = 0;
      var k = true;
      while (k) {
        k = false;
        g = c.indexOf("$", e);
        if (g != -1) {
          e = g + 1;
          var d = c.indexOf("$", g + 1);
          if (d != -1) {
            k = true;
            var b = c.substr(g + 1, d - (g + 1));
            var i = CL3D.CopperCubeVariable.getVariable(b, false, h);
            if (i) {
              var f = c.substr(0, g);
              f += i.getValueAsString();
              e = f.length + 1;
              f += c.substr(d + 1, c.length - d);
              c = f;
            }
          }
        }
      }
      j.setText(c);
    } else {
      j.setText(this.Text);
    }
  }
};
CL3D.Action.MakeSceneNodeInvisible = function() {
  this.InvisibleMakeType = 0;
  this.SceneNodeToMakeInvisible = null;
  this.ChangeCurrentSceneNode = false;
  this.Type = "MakeSceneNodeInvisible";
};
CL3D.Action.MakeSceneNodeInvisible.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.MakeSceneNodeInvisible;
  b.InvisibleMakeType = this.InvisibleMakeType;
  b.SceneNodeToMakeInvisible = this.SceneNodeToMakeInvisible;
  b.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
  if (b.SceneNodeToMakeInvisible == c) {
    b.SceneNodeToMakeInvisible = d;
  }
  return b;
};
CL3D.Action.MakeSceneNodeInvisible.prototype.execute = function(c, b) {
  if (!c || !b) {
    return;
  }
  var a = null;
  if (this.ChangeCurrentSceneNode) {
    a = c;
  } else {
    if (this.SceneNodeToMakeInvisible != -1) {
      a = b.getSceneNodeFromId(this.SceneNodeToMakeInvisible);
    }
  }
  if (a) {
    switch(this.InvisibleMakeType) {
      case 0:
        a.Visible = false;
        break;
      case 1:
        a.Visible = true;
        break;
      case 2:
        a.Visible = !a.Visible;
        break;
    }
  }
};
CL3D.Action.ChangeSceneNodePosition = function() {
  this.UseAnimatedMovement = false;
  this.TimeNeededForMovementMs = false;
  this.Type = "ChangeSceneNodePosition";
};
CL3D.Action.ChangeSceneNodePosition.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.ChangeSceneNodePosition;
  b.PositionChangeType = this.PositionChangeType;
  b.SceneNodeToChangePosition = this.SceneNodeToChangePosition;
  b.SceneNodeRelativeTo = this.SceneNodeRelativeTo;
  b.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
  b.RelativeToCurrentSceneNode = this.RelativeToCurrentSceneNode;
  b.Vector = this.Vector ? this.Vector.clone() : null;
  b.Area3DEnd = this.Area3DEnd ? this.Area3DEnd.clone() : null;
  b.UseAnimatedMovement = this.UseAnimatedMovement;
  b.TimeNeededForMovementMs = this.TimeNeededForMovementMs;
  if (b.SceneNodeToChangePosition == c) {
    b.SceneNodeToChangePosition = d;
  }
  if (b.SceneNodeRelativeTo == c) {
    b.SceneNodeRelativeTo = d;
  }
  return b;
};
CL3D.Action.ChangeSceneNodePosition.prototype.execute = function(a, g) {
  if (!a || !g) {
    return;
  }
  var i = null;
  if (this.ChangeCurrentSceneNode) {
    i = a;
  } else {
    if (this.SceneNodeToChangePosition != -1) {
      i = g.getSceneNodeFromId(this.SceneNodeToChangePosition);
    }
  }
  if (i) {
    var e = null;
    switch(this.PositionChangeType) {
      case 0:
        e = this.Vector.clone();
        break;
      case 1:
        e = i.Pos.add(this.Vector);
        break;
      case 2:
        var h = null;
        if (this.RelativeToCurrentSceneNode) {
          h = a;
        } else {
          if (this.SceneNodeRelativeTo != -1) {
            h = g.getSceneNodeFromId(this.SceneNodeRelativeTo);
          }
        }
        if (h) {
          e = h.Pos.add(this.Vector);
        }
        break;
      case 3:
        var f = this.Vector.getLength();
        var c = i.AbsoluteTransformation;
        var j = new CL3D.Vect3d(1, 0, 0);
        c.rotateVect(j);
        if (i.getType() == "camera") {
          j = i.Target.substract(i.Pos);
        }
        j.setLength(f);
        e = i.Pos.add(j);
        break;
      case 4:
        var d = new CL3D.Box3d;
        d.reset(this.Vector.X, this.Vector.Y, this.Vector.Z);
        d.addInternalPointByVector(this.Area3DEnd);
        e = new CL3D.Vect3d;
        e.X = d.MinEdge.X + Math.random() * (d.MaxEdge.X - d.MinEdge.X);
        e.Y = d.MinEdge.Y + Math.random() * (d.MaxEdge.Y - d.MinEdge.Y);
        e.Z = d.MinEdge.Z + Math.random() * (d.MaxEdge.Z - d.MinEdge.Z);
        break;
      case 5:
        e = g.LastBulletImpactPosition.add(this.Vector);
        break;
    }
    if (e != null) {
      if (this.UseAnimatedMovement && this.TimeNeededForMovementMs > 0) {
        var b = new CL3D.AnimatorFlyStraight;
        b.Start = i.Pos.clone();
        b.End = e;
        b.TimeForWay = this.TimeNeededForMovementMs;
        b.DeleteMeAfterEndReached = true;
        b.recalculateImidiateValues();
        i.addAnimator(b);
      } else {
        i.Pos = e;
      }
    }
  }
};
CL3D.Action.ChangeSceneNodeRotation = function() {
  this.Type = "ChangeSceneNodeRotation";
};
CL3D.Action.ChangeSceneNodeRotation.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.ChangeSceneNodeRotation;
  b.RotationChangeType = this.RotationChangeType;
  b.SceneNodeToChangeRotation = this.SceneNodeToChangeRotation;
  b.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
  b.Vector = this.Vector ? this.Vector.clone() : null;
  b.RotateAnimated = this.RotateAnimated;
  b.TimeNeededForRotationMs = this.TimeNeededForRotationMs;
  if (b.SceneNodeToChangeRotation == c) {
    b.SceneNodeToChangeRotation = d;
  }
  return b;
};
CL3D.Action.ChangeSceneNodeRotation.prototype.execute = function(c, b) {
  if (!c || !b) {
    return;
  }
  var a = null;
  if (this.ChangeCurrentSceneNode) {
    a = c;
  } else {
    if (this.SceneNodeToChangeRotation != -1) {
      a = b.getSceneNodeFromId(this.SceneNodeToChangeRotation);
    }
  }
  if (a) {
    var e = null;
    switch(this.RotationChangeType) {
      case 0:
        e = this.Vector.clone();
        break;
      case 1:
        e = a.Rot.add(this.Vector);
        break;
    }
    if (e) {
      if (!this.RotateAnimated) {
        a.Rot = e;
      } else {
        var d = new CL3D.AnimatorRotation;
        d.setRotateToTargetAndStop(e, a.Rot, this.TimeNeededForRotationMs);
        a.addAnimator(d);
      }
    }
  }
};
CL3D.Action.ChangeSceneNodeScale = function() {
  this.Type = "ChangeSceneNodeScale";
};
CL3D.Action.ChangeSceneNodeScale.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.ChangeSceneNodeScale;
  b.ScaleChangeType = this.ScaleChangeType;
  b.SceneNodeToChangeScale = this.SceneNodeToChangeScale;
  b.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
  b.Vector = this.Vector ? this.Vector.clone() : null;
  if (b.SceneNodeToChangeScale == c) {
    b.SceneNodeToChangeScale = d;
  }
  return b;
};
CL3D.Action.ChangeSceneNodeScale.prototype.execute = function(c, b) {
  if (!c || !b) {
    return;
  }
  var a = null;
  if (this.ChangeCurrentSceneNode) {
    a = c;
  } else {
    if (this.SceneNodeToChangeScale != -1) {
      a = b.getSceneNodeFromId(this.SceneNodeToChangeScale);
    }
  }
  if (a) {
    switch(this.ScaleChangeType) {
      case 0:
        a.Scale = this.Vector.clone();
        break;
      case 1:
        a.Scale = a.Scale.multiplyWithVect(this.Vector);
        break;
    }
  }
};
CL3D.Action.ChangeSceneNodeTexture = function() {
  this.Type = "ChangeSceneNodeTexture";
};
CL3D.Action.ChangeSceneNodeTexture.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.ChangeSceneNodeTexture;
  b.TextureChangeType = this.TextureChangeType;
  b.SceneNodeToChange = this.SceneNodeToChange;
  b.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
  b.TheTexture = this.TheTexture;
  b.IndexToChange = this.IndexToChange;
  if (b.SceneNodeToChange == c) {
    b.SceneNodeToChange = d;
  }
  return b;
};
CL3D.Action.ChangeSceneNodeTexture.prototype.execute = function(e, d) {
  if (!e || !d) {
    return;
  }
  var a = null;
  if (this.ChangeCurrentSceneNode) {
    a = e;
  } else {
    if (this.SceneNodeToChange != -1) {
      a = d.getSceneNodeFromId(this.SceneNodeToChange);
    }
  }
  if (a) {
    if (a.getType() == "2doverlay") {
      a.setShowImage(this.TheTexture);
    } else {
      var f = a.getMaterialCount();
      if (this.TextureChangeType == 0) {
        for (var c = 0;c < f;++c) {
          var b = a.getMaterial(c);
          b.Tex1 = this.TheTexture;
        }
      } else {
        if (this.TextureChangeType == 1) {
          var b = a.getMaterial(this.IndexToChange);
          b.Tex1 = this.TheTexture;
        }
      }
    }
  }
};
CL3D.Action.ExecuteJavaScript = function() {
  this.Type = "ExecuteJavaScript";
};
CL3D.Action.ExecuteJavaScript.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.ExecuteJavaScript;
  b.JScript = this.JScript;
  return b;
};
CL3D.Action.ExecuteJavaScript.prototype.execute = function(currentNode, sceneManager) {
  eval(this.JScript);
};
CL3D.Action.OpenWebpage = function() {
  this.Type = "OpenWebpage";
};
CL3D.Action.OpenWebpage.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.OpenWebpage;
  b.Webpage = this.Webpage;
  b.Target = this.Target;
  return b;
};
CL3D.Action.OpenWebpage.prototype.execute = function(b, a) {
  window.open(this.Webpage, this.Target);
};
CL3D.Action.SetSceneNodeAnimation = function() {
  this.Type = "SetSceneNodeAnimation";
};
CL3D.Action.SetSceneNodeAnimation.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.SetSceneNodeAnimation;
  b.SceneNodeToChangeAnim = this.SceneNodeToChangeAnim;
  b.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
  b.Loop = this.Loop;
  b.AnimName = this.AnimName;
  if (b.SceneNodeToChangeAnim == c) {
    b.SceneNodeToChangeAnim = d;
  }
  return b;
};
CL3D.Action.SetSceneNodeAnimation.prototype.execute = function(d, c) {
  if (!d || !c) {
    return;
  }
  var a = null;
  if (this.ChangeCurrentSceneNode) {
    a = d;
  } else {
    if (this.SceneNodeToChangeAnim != -1) {
      a = c.getSceneNodeFromId(this.SceneNodeToChangeAnim);
    }
  }
  if (a) {
    var b = a;
    if (b.getType() != "animatedmesh") {
      return;
    }
    b.setAnimationByEditorName(this.AnimName, this.Loop);
  }
};
CL3D.Action.SwitchToScene = function(a) {
  this.Engine = a;
  this.Type = "SwitchToScene";
};
CL3D.Action.SwitchToScene.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.SwitchToScene;
  b.SceneName = this.SceneName;
  return b;
};
CL3D.Action.SwitchToScene.prototype.execute = function(b, a) {
  if (this.Engine) {
    this.Engine.gotoSceneByName(this.SceneName, true);
  }
};
CL3D.Action.SetActiveCamera = function(a) {
  this.Engine = a;
  this.Type = "SetActiveCamera";
};
CL3D.Action.SetActiveCamera.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.SetActiveCamera;
  b.CameraToSetActive = this.CameraToSetActive;
  if (b.CameraToSetActive == c) {
    b.CameraToSetActive = d;
  }
  return b;
};
CL3D.Action.SetActiveCamera.prototype.execute = function(c, b) {
  if (!c || !b) {
    return;
  }
  var a = null;
  if (this.CameraToSetActive != -1) {
    a = b.getSceneNodeFromId(this.CameraToSetActive);
  }
  if (a != null) {
    if (a.getType() == "camera") {
      if (this.Engine) {
        this.Engine.setActiveCameraNextFrame(a);
      }
    }
  }
};
CL3D.Action.SetCameraTarget = function() {
  this.UseAnimatedMovement = false;
  this.TimeNeededForMovementMs = 0;
  this.Type = "SetCameraTarget";
};
CL3D.Action.SetCameraTarget.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.SetCameraTarget;
  b.PositionChangeType = this.PositionChangeType;
  b.SceneNodeToChangePosition = this.SceneNodeToChangePosition;
  b.SceneNodeRelativeTo = this.SceneNodeRelativeTo;
  b.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
  b.RelativeToCurrentSceneNode = this.RelativeToCurrentSceneNode;
  b.Vector = this.Vector ? this.Vector.clone() : null;
  b.UseAnimatedMovement = this.UseAnimatedMovement;
  b.TimeNeededForMovementMs = this.TimeNeededForMovementMs;
  return b;
};
CL3D.Action.SetCameraTarget.prototype.execute = function(f, e) {
  if (!f || !e) {
    return;
  }
  var b = null;
  if (this.ChangeCurrentSceneNode) {
    b = f;
  } else {
    if (this.SceneNodeToChangePosition != -1) {
      b = e.getSceneNodeFromId(this.SceneNodeToChangePosition);
    }
  }
  var h = b;
  if (h.getType() != "camera") {
    return;
  }
  var a = h.getTarget().clone();
  switch(this.PositionChangeType) {
    case 0:
      a = this.Vector.clone();
      break;
    case 1:
      a = b.Pos.add(this.Vector);
      break;
    case 2:
      var d = null;
      if (this.RelativeToCurrentSceneNode) {
        d = f;
      } else {
        if (this.SceneNodeRelativeTo != -1) {
          d = e.getSceneNodeFromId(this.SceneNodeRelativeTo);
        }
      }
      if (d) {
        a = d.Pos.add(this.Vector);
      }
      break;
  }
  if (a != null) {
    if (this.UseAnimatedMovement && this.TimeNeededForMovementMs > 0) {
      var g = new CL3D.AnimatorFlyStraight;
      g.Start = h.getTarget().clone();
      g.End = a;
      g.TimeForWay = this.TimeNeededForMovementMs;
      g.DeleteMeAfterEndReached = true;
      g.AnimateCameraTargetInsteadOfPosition = true;
      g.recalculateImidiateValues();
      b.addAnimator(g);
    } else {
      h.setTarget(a);
      var c = h.getAnimatorOfType("camerafps");
      if (c != null) {
        c.lookAt(a);
      }
    }
  }
};
CL3D.Action.Shoot = function() {
  this.ShootType = 0;
  this.Damage = 0;
  this.BulletSpeed = 0;
  this.SceneNodeToUseAsBullet = -1;
  this.WeaponRange = 100;
  this.Type = "Shoot";
  this.SceneNodeToShootFrom = -1;
  this.ShootToCameraTarget = false;
  this.AdditionalDirectionRotation = null;
  this.ActionHandlerOnImpact = null;
  this.ShootDisplacement = new CL3D.Vect3d;
};
CL3D.Action.Shoot.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.Shoot;
  b.ShootType = this.ShootType;
  b.Damage = this.Damage;
  b.BulletSpeed = this.BulletSpeed;
  b.SceneNodeToUseAsBullet = this.SceneNodeToUseAsBullet;
  b.WeaponRange = this.WeaponRange;
  b.SceneNodeToShootFrom = this.SceneNodeToShootFrom;
  b.ShootToCameraTarget = this.ShootToCameraTarget;
  b.AdditionalDirectionRotation = this.AdditionalDirectionRotation;
  b.ActionHandlerOnImpact = this.ActionHandlerOnImpact ? this.ActionHandlerOnImpact.createClone(c, d) : null;
  b.ShootDisplacement = this.ShootDisplacement.clone();
  if (b.SceneNodeToUseAsBullet == c) {
    b.SceneNodeToUseAsBullet = d;
  }
  if (b.SceneNodeToShootFrom == c) {
    b.SceneNodeToShootFrom = d;
  }
  return b;
};
CL3D.Action.Shoot.prototype.execute = function(e, b) {
  if (!e || !b) {
    return;
  }
  var k = new CL3D.Line3d;
  var t = false;
  var j = null;
  var i = null;
  var f = b.getAllSceneNodesWithAnimator("gameai");
  if (this.SceneNodeToShootFrom != -1) {
    var l = b.getSceneNodeFromId(this.SceneNodeToShootFrom);
    if (l != null) {
      t = true;
      j = l;
      k.Start = l.getBoundingBox().getCenter();
      k.Start.addToThis(this.ShootDisplacement);
      l.AbsoluteTransformation.transformVect(k.Start);
      i = b.getActiveCamera();
      if (this.ShootToCameraTarget && i) {
        var d = new CL3D.Line3d;
        d.Start = i.getAbsolutePosition();
        d.End = i.getTarget();
        var c = d.getVector();
        c.setLength(this.WeaponRange);
        d.End = d.Start.add(c);
        this.shortenRayToClosestCollisionPointWithWorld(d, f, this.WeaponRange, b);
        this.shortenRayToClosestCollisionPointWithAIAnimator(d, f, this.WeaponRange, j, b);
        k.End = d.End;
      } else {
        var v = l.AbsoluteTransformation;
        if (this.AdditionalDirectionRotation) {
          var n = new CL3D.Matrix4;
          n.setRotationDegrees(this.AdditionalDirectionRotation);
          v = v.multiply(n);
        }
        k.End.set(1, 0, 0);
        v.rotateVect(k.End);
        k.End.addToThis(k.Start);
      }
    }
  } else {
    if (e != null) {
      j = e;
      var r = e.getAnimatorOfType("gameai");
      if (r && r.isCurrentlyShooting()) {
        k = r.getCurrentlyShootingLine();
        t = true;
      }
    }
  }
  if (!t) {
    i = b.getActiveCamera();
    if (i) {
      j = i;
      k.Start = i.getAbsolutePosition();
      k.End = i.getTarget();
      t = true;
    }
  }
  if (!t) {
    return;
  }
  var o = k.getVector();
  o.setLength(this.WeaponRange);
  k.End = k.Start.add(o);
  this.shortenRayToClosestCollisionPointWithWorld(k, f, this.WeaponRange, b);
  if (this.ShootType == 1) {
    var u = null;
    if (this.SceneNodeToUseAsBullet != -1) {
      u = b.getSceneNodeFromId(this.SceneNodeToUseAsBullet);
    }
    if (u) {
      var h = u.createClone(b.getRootSceneNode(), -1, -1);
      b.getRootSceneNode().addChild(h);
      if (h != null) {
        h.Pos = k.Start;
        h.updateAbsolutePosition();
        h.Visible = true;
        h.Id = -1;
        h.Name = "";
        var a = k.getVector();
        a = a.getHorizontalAngle();
        h.Rot = a;
        var q = this.BulletSpeed;
        if (q == 0) {
          q = 1;
        }
        var p = new CL3D.AnimatorFlyStraight;
        p.Start = k.Start;
        p.End = k.End;
        p.TimeForWay = k.getLength() / q;
        p.DeleteMeAfterEndReached = true;
        p.recalculateImidiateValues();
        p.TestShootCollisionWithBullet = true;
        p.ShootCollisionNodeToIgnore = e;
        p.ShootCollisionDamage = this.Damage;
        p.DeleteSceneNodeAfterEndReached = true;
        p.ActionToExecuteOnEnd = this.ActionHandlerOnImpact;
        p.ExecuteActionOnEndOnlyIfTimeSmallerThen = this.WeaponRange / q;
        h.addAnimator(p);
      }
    }
  } else {
    if (this.ShootType == 0) {
      var w = this.WeaponRange;
      var m = this.shortenRayToClosestCollisionPointWithAIAnimator(k, f, this.WeaponRange, j, b);
      if (m != null) {
        b.LastBulletImpactPosition = k.End.clone();
        var g = m.getAnimatorOfType("gameai");
        if (g) {
          g.OnHit(this.Damage, m);
        }
      }
    }
  }
};
CL3D.Action.Shoot.prototype.shortenRayToClosestCollisionPointWithWorld = function(c, h, b, f) {
  if (h.length != 0) {
    var e = h[0].getAnimatorOfType("gameai");
    if (e) {
      var g = e.World;
      if (g) {
        var a = CL3D.AnimatorOnClick.prototype.static_getDistanceToNearestCollisionPointWithWorld(f, c.Start, c.End, g, true);
        if (a < b) {
          var d = c.getVector();
          d.setLength(a);
          c.End = c.Start.add(d);
        }
      }
    }
  }
};
CL3D.Action.Shoot.prototype.shortenRayToClosestCollisionPointWithAIAnimator = function(h, l, b, a, j) {
  var e = b;
  var f = null;
  for (var d = 0;d < l.length;++d) {
    if (l[d] === a) {
      continue;
    }
    var k = l[d].getAnimatorOfType("gameai");
    if (k && !k.isAlive()) {
      continue;
    }
    var g = new Object;
    g.N = 0;
    if (CL3D.AnimatorOnClick.prototype.static_getCollisionDistanceWithNode(j, l[d], h, false, false, null, g)) {
      if (g.N < e) {
        e = g.N;
        f = l[d];
      }
    }
  }
  if (f) {
    var c = h.getVector();
    c.setLength(e);
    h.End = h.Start.add(c);
  }
  return f;
};
CL3D.Action.Shoot.prototype.getWeaponRange = function() {
  return this.WeaponRange;
};
CL3D.Action.SetOrChangeAVariable = function() {
  this.Type = "SetOrChangeAVariable";
};
CL3D.Action.SetOrChangeAVariable.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.SetOrChangeAVariable;
  b.VariableName = this.VariableName;
  b.Operation = this.Operation;
  b.ValueType = this.ValueType;
  b.Value = this.Value;
  return b;
};
CL3D.Action.SetOrChangeAVariable.prototype.execute = function(d, c) {
  if (!d || !c) {
    return;
  }
  if (this.VariableName == null) {
    return;
  }
  var f = CL3D.CopperCubeVariable.getVariable(this.VariableName, true, c);
  if (f == null) {
    return;
  }
  var e = null;
  if (this.ValueType == 1) {
    e = CL3D.CopperCubeVariable.getVariable(this.Value, false, c);
    if (e == null) {
      return;
    }
  }
  if (e == null) {
    e = new CL3D.CopperCubeVariable;
    e.setValueAsString(this.Value);
  }
  switch(this.Operation) {
    case 0:
      f.setAsCopy(e);
      break;
    case 1:
      f.setValueAsFloat(f.getValueAsFloat() + e.getValueAsFloat());
      break;
    case 2:
      f.setValueAsFloat(f.getValueAsFloat() - e.getValueAsFloat());
      break;
    case 3:
      var b = e.getValueAsFloat();
      f.setValueAsFloat(b != 0 ? f.getValueAsFloat() / b : 0);
      break;
    case 4:
      var a = e.getValueAsFloat();
      f.setValueAsInt(a != 0 ? Math.floor(f.getValueAsFloat() / a) : 0);
      break;
    case 5:
      f.setValueAsFloat(f.getValueAsFloat() * e.getValueAsFloat());
      break;
    case 6:
      f.setValueAsInt(Math.floor(f.getValueAsFloat() * e.getValueAsFloat()));
      break;
  }
  CL3D.CopperCubeVariable.saveContentOfPotentialTemporaryVariableIntoSource(f, c);
};
CL3D.Action.IfVariable = function() {
  this.Type = "IfVariable";
};
CL3D.Action.IfVariable.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.IfVariable;
  b.VariableName = this.VariableName;
  b.ComparisonType = this.ComparisonType;
  b.ValueType = this.ValueType;
  b.Value = this.Value;
  b.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(c, d) : null;
  b.TheElseActionHandler = this.TheElseActionHandler ? this.TheElseActionHandler.createClone(c, d) : null;
  return b;
};
CL3D.Action.IfVariable.prototype.execute = function(b, a) {
  if (!b || !a) {
    return;
  }
  if (this.VariableName == null) {
    return;
  }
  var e = CL3D.CopperCubeVariable.getVariable(this.VariableName, true, a);
  if (e == null) {
    return;
  }
  var d = null;
  if (this.ValueType == 1) {
    d = CL3D.CopperCubeVariable.getVariable(this.Value, false, a);
    if (d == null) {
      return;
    }
  }
  if (d == null) {
    d = new CL3D.CopperCubeVariable;
    d.setValueAsString(this.Value);
  }
  var c = false;
  switch(this.ComparisonType) {
    case 0:
    ;
    case 1:
      if (e.isString() && d.isString()) {
        c = e.getValueAsString() == d.getValueAsString();
      } else {
        c = CL3D.equals(e.getValueAsFloat(), d.getValueAsFloat());
      }
      if (this.ComparisonType == 1) {
        c = !c;
      }
      break;
    case 2:
      c = e.getValueAsFloat() > d.getValueAsFloat();
      break;
    case 3:
      c = e.getValueAsFloat() < d.getValueAsFloat();
      break;
  }
  if (c) {
    if (this.TheActionHandler) {
      this.TheActionHandler.execute(b);
    }
  } else {
    if (this.TheElseActionHandler) {
      this.TheElseActionHandler.execute(b);
    }
  }
};
CL3D.Action.RestartBehaviors = function() {
  this.SceneNodeToRestart = null;
  this.ChangeCurrentSceneNode = false;
  this.Type = "RestartBehaviors";
};
CL3D.Action.RestartBehaviors.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.RestartBehaviors;
  b.SceneNodeToRestart = this.SceneNodeToRestart;
  b.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
  if (b.ChangeCurrentSceneNode == c) {
    b.ChangeCurrentSceneNode = d;
  }
  return b;
};
CL3D.Action.RestartBehaviors.prototype.execute = function(f, e) {
  if (!f || !e) {
    return;
  }
  var b = null;
  if (this.ChangeCurrentSceneNode) {
    b = f;
  } else {
    if (this.SceneNodeToRestart != -1) {
      b = e.getSceneNodeFromId(this.SceneNodeToRestart);
    }
  }
  if (b) {
    for (var d = 0;d < b.Animators.length;++d) {
      var c = b.Animators[d];
      if (c != null) {
        c.reset();
      }
    }
  }
};
CL3D.Action.ActionPlaySound = function() {
  this.Type = "PlaySound";
};
CL3D.Action.ActionPlaySound.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.ActionPlaySound;
  b.SceneNodeToPlayAt = this.SceneNodeToPlayAt;
  b.PlayAtCurrentSceneNode = this.PlayAtCurrentSceneNode;
  b.Position3D = this.Position3D ? this.Position3D.clone() : null;
  b.MinDistance = this.MinDistance;
  b.MaxDistance = this.MaxDistance;
  b.PlayLooped = this.PlayLooped;
  b.Volume = this.Volume;
  b.PlayAs2D = this.PlayAs2D;
  b.TheSound = this.TheSound;
  if (b.SceneNodeToPlayAt == c) {
    b.SceneNodeToPlayAt = d;
  }
  return b;
};
CL3D.Action.ActionPlaySound.prototype.execute = function(b, a) {
  if (a == null || this.TheSound == null) {
    return;
  }
  if (this.PlayAs2D || true) {
    this.PlayingSound = CL3D.gSoundManager.play2D(this.TheSound, this.PlayLooped, this.Volume);
  }
};
CL3D.Action.ActionStopSound = function() {
  this.Type = "StopSound";
};
CL3D.Action.ActionStopSound.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.ActionStopSound;
  b.SoundChangeType = this.SoundChangeType;
  b.SoundFileName = this.SoundFileName;
  return b;
};
CL3D.Action.ActionStopSound.prototype.execute = function(b, a) {
  CL3D.gSoundManager.stopAll();
};
CL3D.Action.ActionStoreLoadVariable = function() {
  this.Type = "StoreLoadVariable";
};
CL3D.Action.ActionStoreLoadVariable.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.ActionStoreLoadVariable;
  b.Load = this.Load;
  b.VariableName = this.VariableName;
  return b;
};
CL3D.Action.ActionStoreLoadVariable.prototype.setCookie = function(e, c, a) {
  var b = new Date;
  b.setDate(b.getDate() + a);
  var d = escape(c) + ("; expires=" + b.toUTCString());
  document.cookie = e + "=" + d;
};
CL3D.Action.ActionStoreLoadVariable.prototype.getCookie = function(f) {
  var d = document.cookie.split(";");
  for (var c = 0;c < d.length;++c) {
    var b = d[c];
    var e = b.indexOf("=");
    var a = b.substr(0, e);
    a = a.replace(/^\s+|\s+$/g, "");
    if (a == f) {
      return unescape(b.substr(e + 1));
    }
  }
  return null;
};
CL3D.Action.ActionStoreLoadVariable.prototype.execute = function(b, a) {
  if (this.VariableName == null || this.VariableName == "") {
    return;
  }
  var d = CL3D.CopperCubeVariable.getVariable(this.VariableName, this.Load, a);
  if (d != null) {
    try {
      if (this.Load) {
        d.setValueAsString(this.getCookie(d.getName()));
      } else {
        this.setCookie(d.getName(), d.getValueAsString(), 99);
      }
    } catch (c) {
    }
  }
};
CL3D.ActionHandler = function(a) {
  this.Actions = new Array;
  this.SMGr = a;
};
CL3D.ActionHandler.prototype.execute = function(b, c) {
  for (var a = 0;a < this.Actions.length;++a) {
    this.Actions[a].execute(b, this.SMGr);
  }
};
CL3D.ActionHandler.prototype.addAction = function(b) {
  if (b == null) {
    return;
  }
  this.Actions.push(b);
};
CL3D.ActionHandler.prototype.findAction = function(d) {
  for (var c = 0;c < this.Actions.length;++c) {
    var b = this.Actions[c];
    if (b.Type == d) {
      return b;
    }
  }
  return null;
};
CL3D.ActionHandler.prototype.createClone = function(e, g) {
  var f = new CL3D.ActionHandler(this.SMGr);
  for (var d = 0;d < this.Actions.length;++d) {
    var b = this.Actions[d];
    if (b.createClone != null) {
      f.addAction(b.createClone(e, g));
    }
  }
  return f;
};
CL3D.Action.ActionRestartScene = function(a) {
  this.Engine = a;
  this.Type = "RestartScene";
};
CL3D.Action.ActionRestartScene.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.ActionRestartScene;
  b.SceneName = this.SceneName;
  return b;
};
CL3D.Action.ActionRestartScene.prototype.execute = function(b, a) {
  if (this.Engine) {
    this.Engine.reloadScene(this.SceneName);
  }
};
CL3D.Action.ActionDeleteSceneNode = function() {
  this.Type = "ActionDeleteSceneNode";
};
CL3D.Action.ActionDeleteSceneNode.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.ActionDeleteSceneNode;
  b.SceneNodeToDelete = this.SceneNodeToDelete;
  b.DeleteCurrentSceneNode = this.DeleteCurrentSceneNode;
  b.TimeAfterDelete = this.TimeAfterDelete;
  if (b.SceneNodeToDelete == c) {
    b.SceneNodeToDelete = d;
  }
  return b;
};
CL3D.Action.ActionDeleteSceneNode.prototype.execute = function(c, b) {
  if (!c || !b) {
    return;
  }
  var a = null;
  if (this.DeleteCurrentSceneNode) {
    a = c;
  } else {
    if (this.SceneNodeToDelete != -1) {
      a = b.getSceneNodeFromId(this.SceneNodeToDelete);
    }
  }
  if (a != null) {
    b.addToDeletionQueue(a, this.TimeAfterDelete);
  }
};
CL3D.Action.ActionCloneSceneNode = function() {
  this.Type = "ActionCloneSceneNode";
};
CL3D.Action.ActionCloneSceneNode.prototype.createClone = function(c, d) {
  var b = new CL3D.Action.ActionCloneSceneNode;
  b.SceneNodeToClone = this.SceneNodeToClone;
  b.CloneCurrentSceneNode = this.CloneCurrentSceneNode;
  b.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(c, d) : null;
  if (b.SceneNodeToClone == c) {
    b.SceneNodeToClone = d;
  }
  return b;
};
CL3D.Action.ActionCloneSceneNode.prototype.execute = function(e, d) {
  if (!e || !d) {
    return;
  }
  var b = null;
  if (this.CloneCurrentSceneNode) {
    b = e;
  } else {
    if (this.SceneNodeToClone != -1) {
      b = d.getSceneNodeFromId(this.SceneNodeToClone);
    }
  }
  if (b) {
    var f = b.Id;
    var c = -1;
    c = d.getUnusedSceneNodeId();
    var a = b.createClone(b.Parent, f, c);
    if (a != null) {
      a.Id = c;
      b.Parent.addChild(a);
      if (this.TheActionHandler) {
        this.TheActionHandler.execute(a);
      }
    }
  }
};
CL3D.Material = function() {
  this.Type = 0;
  this.Tex1 = null;
  this.Tex2 = null;
  this.ZWriteEnabled = true;
  this.ClampTexture1 = false;
  this.Lighting = false;
  this.BackfaceCulling = true;
};
CL3D.Material.prototype.setFrom = function(a) {
  if (!a) {
    return;
  }
  this.Type = a.Type;
  this.ZWriteEnabled = a.ZWriteEnabled;
  this.Tex1 = a.Tex1;
  this.Tex2 = a.Tex2;
  this.ClampTexture1 = a.ClampTexture1;
  this.Lighting = a.Lighting;
  this.BackfaceCulling = a.BackfaceCulling;
};
CL3D.Material.prototype.clone = function() {
  var a = new CL3D.Material;
  a.Type = this.Type;
  a.ZReadEnabled = this.ZReadEnabled;
  a.ZWriteEnabled = this.ZWriteEnabled;
  a.Tex1 = this.Tex1;
  a.Tex2 = this.Tex2;
  a.ClampTexture1 = this.ClampTexture1;
  a.Lighting = this.Lighting;
  a.BackfaceCulling = this.BackfaceCulling;
  return a;
};
CL3D.Material.prototype.isTransparent = function() {
  return this.Type == CL3D.Material.EMT_TRANSPARENT_ADD_COLOR || (this.Type == CL3D.Material.EMT_TRANSPARENT_ALPHA_CHANNEL || this.Type == CL3D.Material.EMT_TRANSPARENT_REFLECTION_2_LAYER);
};
CL3D.Material.prototype.Type = 0;
CL3D.Material.prototype.Tex1 = null;
CL3D.Material.prototype.Tex2 = null;
CL3D.Material.prototype.ZWriteEnabled = true;
CL3D.Material.prototype.ZReadEnabled = true;
CL3D.Material.prototype.ClampTexture1 = false;
CL3D.Material.prototype.BackfaceCulling = true;
CL3D.Material.prototype.Lighting = false;
CL3D.Material.EMT_SOLID = 0;
CL3D.Material.EMT_LIGHTMAP = 2;
CL3D.Material.EMT_REFLECTION_2_LAYER = 11;
CL3D.Material.EMT_TRANSPARENT_ADD_COLOR = 12;
CL3D.Material.EMT_TRANSPARENT_ALPHA_CHANNEL = 13;
CL3D.Material.EMT_TRANSPARENT_REFLECTION_2_LAYER = 16;
CL3D.Material.EMT_NORMAL_MAP_SOLID = 17;
CL3D.Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF = 14;
CL3D.MeshBuffer = function() {
  this.Box = new CL3D.Box3d;
  this.Mat = new CL3D.Material;
  this.Indices = new Array;
  this.Vertices = new Array;
  this.RendererNativeArray = null;
  this.OnlyPositionsChanged = false;
  this.OnlyUpdateBufferIfPossible = false;
  this.Tangents = null;
  this.Binormals = null;
};
CL3D.MeshBuffer.prototype.Box = null;
CL3D.MeshBuffer.prototype.Mat = null;
CL3D.MeshBuffer.prototype.Indices = null;
CL3D.MeshBuffer.prototype.Vertices = null;
CL3D.MeshBuffer.prototype.RendererNativeArray = null;
CL3D.MeshBuffer.prototype.Tangents = null;
CL3D.MeshBuffer.prototype.Binormals = null;
CL3D.MeshBuffer.prototype.update = function(b, a) {
  if (b) {
    this.OnlyPositionsChanged = true;
  } else {
    if (a) {
      this.OnlyUpdateBufferIfPossible = true;
    } else {
      this.RendererNativeArray = null;
    }
  }
};
CL3D.MeshBuffer.prototype.freeNativeArray = function() {
  var a = this.RendererNativeArray;
  if (a && a.gl) {
    if (a.positionBuffer) {
      a.gl.deleteBuffer(a.positionBuffer);
    }
    if (a.positionsArray) {
      delete a.positionsArray;
    }
    if (a.texcoordsBuffer) {
      a.gl.deleteBuffer(a.texcoordsBuffer);
    }
    if (a.texcoordsBuffer2) {
      a.gl.deleteBuffer(a.texcoordsBuffer2);
    }
    if (a.normalBuffer) {
      a.gl.deleteBuffer(a.normalBuffer);
    }
    if (a.colorBuffer) {
      a.gl.deleteBuffer(a.colorBuffer);
    }
    if (a.indexBuffer) {
      a.gl.deleteBuffer(a.colorBuffer);
    }
    if (this.Tangents) {
      a.gl.deleteBuffer(a.gl.tangentBuffer);
    }
    if (this.Binormals) {
      a.gl.deleteBuffer(a.gl.binormalBuffer);
    }
  }
  delete this.RendererNativeArray;
};
CL3D.MeshBuffer.prototype.recalculateBoundingBox = function() {
  if (!this.Vertices || this.Vertices.length == 0) {
    this.Box.reset(0, 0, 0);
  } else {
    var a = this.Vertices[0];
    this.Box.MinEdge = a.Pos.clone();
    this.Box.MaxEdge = a.Pos.clone();
    for (var b = 1;b < this.Vertices.length;++b) {
      a = this.Vertices[b];
      this.Box.addInternalPointByVector(a.Pos);
    }
  }
};
CL3D.MeshBuffer.prototype.createClone = function() {
  var a = new CL3D.MeshBuffer;
  a.Box = this.Box.clone();
  a.Mat = this.Mat.clone();
  if (this.Vertices) {
    for (var b = 0;b < this.Vertices.length;++b) {
      a.Vertices.push(this.Vertices[b]);
    }
  }
  if (this.Indices) {
    for (var b = 0;b < this.Indices.length;++b) {
      a.Indices.push(this.Indices[b]);
    }
  }
  if (this.Tangents) {
    for (var b = 0;b < this.Tangents.length;++b) {
      a.Tangents.push(this.Tangents[b]);
    }
  }
  if (this.Binormals) {
    for (var b = 0;b < this.Binormals.length;++b) {
      a.Binormals.push(this.Binormals[b]);
    }
  }
  return a;
};
CL3D.Mesh = function() {
  this.Box = new CL3D.Box3d;
  this.MeshBuffers = new Array;
};
CL3D.Mesh.prototype.AddMeshBuffer = function(a) {
  this.MeshBuffers.push(a);
};
CL3D.Mesh.prototype.GetMeshBuffers = function() {
  return this.MeshBuffers;
};
CL3D.Mesh.prototype.GetPolyCount = function() {
  var b = 0;
  if (this.MeshBuffers) {
    for (var a = 0;a < this.MeshBuffers.length;++a) {
      if (this.MeshBuffers[a].Indices) {
        b += this.MeshBuffers[a].Indices.length;
      }
    }
  }
  return b / 3;
};
CL3D.Mesh.prototype.createClone = function() {
  var a = new CL3D.Mesh;
  a.Box = this.Box.clone();
  if (this.MeshBuffers) {
    for (var b = 0;b < this.MeshBuffers.length;++b) {
      if (this.MeshBuffers[b]) {
        a.MeshBuffers.push(this.MeshBuffers[b].createClone());
      }
    }
  }
  return a;
};
CL3D.MeshCache = function() {
  this.Meshes = new Array;
};
CL3D.MeshCache.prototype.getMeshFromName = function(a) {
  for (var c = 0;c < this.Meshes.length;++c) {
    var b = this.Meshes[c];
    if (b.Name == a) {
      return b;
    }
  }
  return null;
};
CL3D.MeshCache.prototype.addMesh = function(a) {
  if (a != null) {
    this.Meshes.push(a);
  }
};
CL3D.SkinnedMeshJoint = function() {
  this.Name = "";
  this.LocalMatrix = new CL3D.Matrix4;
  this.Children = new Array;
  this.AttachedMeshes = new Array;
  this.PositionKeys = new Array;
  this.ScaleKeys = new Array;
  this.RotationKeys = new Array;
  this.Weights = new Array;
  this.GlobalMatrix = new CL3D.Matrix4;
  this.GlobalAnimatedMatrix = new CL3D.Matrix4;
  this.LocalAnimatedMatrix = new CL3D.Matrix4;
  this.Animatedposition = new CL3D.Vect3d(0, 0, 0);
  this.Animatedscale = new CL3D.Vect3d(1, 1, 1);
  this.Animatedrotation = new CL3D.Quaternion;
  this.GlobalInversedMatrix = new CL3D.Matrix4;
  this.GlobalSkinningSpace = false;
  this.positionHint = -1;
  this.scaleHint = -1;
  this.rotationHint = -1;
};
CL3D.SkinnedMeshWeight = function() {
  this.buffer_id = 0;
  this.vertex_id = 0;
  this.strength = 0;
  this.StaticPos = new CL3D.Vect3d;
  this.StaticNormal = new CL3D.Vect3d;
};
CL3D.SkinnedMeshScaleKey = function() {
  this.frame = 0;
  this.scale = new CL3D.Vect3d;
};
CL3D.SkinnedMeshPositionKey = function() {
  this.frame = 0;
  this.position = new CL3D.Vect3d;
};
CL3D.SkinnedMeshRotationKey = function() {
  this.frame = 0;
  this.rotation = new CL3D.Quaternion;
};
CL3D.NamedAnimationRange = function() {
  this.Name = "";
  this.Begin = 0;
  this.End = 0;
  this.FPS = 0;
};
CL3D.NamedAnimationRange.prototype.Name = "";
CL3D.NamedAnimationRange.prototype.Begin = 0;
CL3D.NamedAnimationRange.prototype.End = 0;
CL3D.NamedAnimationRange.prototype.FPS = 0;
CL3D.SkinnedMesh = function() {
  this.Name = "";
  this.AnimatedMeshesToLink = new Array;
  this.AnimationFrames = 0;
  this.LocalBuffers = new Array;
  this.AllJoints = new Array;
  this.RootJoints = new Array;
  this.DefaultFPS = 0;
  this.HasAnimation = false;
  this.PreparedForSkinning = false;
  this.LastAnimatedFrame = 0;
  this.LastSkinnedFrame = 0;
  this.BoneControlUsed = 0;
  this.BoundingBox = new CL3D.Box3d;
  this.InterpolationMode = 1;
  this.Vertices_Moved = new Array;
  this.NamedAnimationRanges = new Array;
};
CL3D.SkinnedMesh.prototype.AddMeshBuffer = function(a) {
  this.LocalBuffers.push(a);
};
CL3D.SkinnedMesh.prototype.getFrameCount = function() {
  return Math.floor(this.AnimationFrames);
};
CL3D.SkinnedMesh.prototype.getBoundingBox = function() {
  return this.BoundingBox;
};
CL3D.SkinnedMesh.prototype.finalize = function() {
  this.LastAnimatedFrame = -1;
  this.LastSkinnedFrame = -1;
  var g = 0;
  var f = 0;
  var h;
  var d;
  for (var k = 0;k < this.AllJoints.length;++k) {
    var m = false;
    for (g = 0;g < this.AllJoints.length;++g) {
      d = this.AllJoints[g];
      for (var c = 0;c < d.Children.length;++c) {
        if (d.Children[c] === this.AllJoints[k]) {
          m = true;
        }
      }
    }
    if (!m) {
      this.RootJoints.push(this.AllJoints[k]);
    }
  }
  for (g = 0;g < this.LocalBuffers.length;++g) {
    var b = new Array;
    this.Vertices_Moved.push(b);
    h = this.LocalBuffers[g];
    var a = h.Vertices.length;
    for (var l = 0;l < a;++l) {
      b.push(false);
    }
  }
  this.checkForAnimation();
  this.CalculateGlobalMatrices(null, null);
  for (g = 0;g < this.AllJoints.length;++g) {
    d = this.AllJoints[g];
    for (f = 0;f < d.AttachedMeshes.length;++f) {
      h = this.LocalBuffers[d.AttachedMeshes[f]];
      h.Transformation = d.GlobalAnimatedMatrix.clone();
    }
  }
  if (this.LocalBuffers.length == 0) {
    this.BoundingBox.MinEdge.set(0, 0, 0);
    this.BoundingBox.MaxEdge.set(0, 0, 0);
  } else {
    h = this.LocalBuffers[0];
    this.BoundingBox.MinEdge = h.Box.MinEdge.clone();
    this.BoundingBox.MaxEdge = h.Box.MaxEdge.clone();
    for (g = 1;g < this.LocalBuffers.length;++g) {
      h = this.LocalBuffers[g];
      if (h.Transformation == null) {
        this.BoundingBox.addInternalPointByVector(h.Box.MinEdge);
        this.BoundingBox.addInternalPointByVector(h.Box.MaxEdge);
      } else {
        var e = h.Box.clone();
        h.Transformation.transformBoxEx(e);
        this.BoundingBox.addInternalPointByVector(e.MinEdge);
        this.BoundingBox.addInternalPointByVector(e.MaxEdge);
      }
    }
  }
};
CL3D.SkinnedMesh.prototype.checkForAnimation = function() {
  this.HasAnimation = false;
  var f = 0;
  var e = 0;
  var g;
  var c;
  for (f = 0;f < this.AllJoints.length;++f) {
    c = this.AllJoints[f];
    if (c.PositionKeys.length || (c.ScaleKeys.length || (c.RotationKeys.length || c.Weights.length))) {
      this.HasAnimation = true;
      break;
    }
  }
  if (this.HasAnimation) {
    this.AnimationFrames = 0;
    for (f = 0;f < this.AllJoints.length;++f) {
      c = this.AllJoints[f];
      if (c.PositionKeys.length) {
        var h = c.PositionKeys[c.PositionKeys.length - 1];
        if (h.frame > this.AnimationFrames) {
          this.AnimationFrames = h.frame;
        }
      }
      if (c.ScaleKeys.length) {
        var l = c.ScaleKeys[c.ScaleKeys.length - 1];
        if (l.frame > this.AnimationFrames) {
          this.AnimationFrames = l.frame;
        }
      }
      if (c.RotationKeys.length) {
        var m = c.RotationKeys[c.RotationKeys.length - 1];
        if (m.frame > this.AnimationFrames) {
          this.AnimationFrames = m.frame;
        }
      }
    }
  }
  if (this.HasAnimation && !this.PreparedForSkinning) {
    this.PreparedForSkinning = true;
    for (f = 0;f < this.AllJoints.length;++f) {
      c = this.AllJoints[f];
      for (e = 0;e < c.Weights.length;++e) {
        var k = c.Weights[e];
        var d = k.buffer_id;
        var b = k.vertex_id;
        g = this.LocalBuffers[d];
        var a = g.Vertices[b];
        k.StaticPos = a.Pos.clone();
        k.StaticNormal = a.Normal.clone();
      }
    }
  }
};
CL3D.SkinnedMesh.prototype.CalculateGlobalMatrices = function(d, c) {
  if (d == null && c != null) {
    return;
  }
  if (d == null) {
    for (var b = 0;b < this.RootJoints.length;++b) {
      this.CalculateGlobalMatrices(this.RootJoints[b], null);
    }
    return;
  }
  if (c == null) {
    d.GlobalMatrix = d.LocalMatrix.clone();
  } else {
    d.GlobalMatrix = c.GlobalMatrix.multiply(d.LocalMatrix);
  }
  d.LocalAnimatedMatrix = d.LocalMatrix.clone();
  d.GlobalAnimatedMatrix = d.GlobalMatrix.clone();
  if (d.GlobalInversedMatrix.isIdentity()) {
    d.GlobalInversedMatrix = d.GlobalMatrix.clone();
    d.GlobalInversedMatrix.makeInverse();
  }
  for (var a = 0;a < d.Children.length;++a) {
    this.CalculateGlobalMatrices(d.Children[a], d);
  }
};
CL3D.SkinnedMesh.prototype.animateMesh = function(g, b) {
  if (b == null) {
    b = 1;
  }
  if (!this.HasAnimation || CL3D.equals(this.LastAnimatedFrame, g)) {
    return false;
  }
  this.LastAnimatedFrame = g;
  if (b <= 0) {
    return false;
  }
  for (var d = 0;d < this.AllJoints.length;++d) {
    var e = this.AllJoints[d];
    var a = e.Animatedposition.clone();
    var f = e.Animatedscale.clone();
    var c = e.Animatedrotation.clone();
    this.getFrameData(g, e, a, e.positionHint, f, e.scaleHint, c, e.rotationHint);
    e.Animatedposition = a.clone();
    e.Animatedscale = f.clone();
    e.Animatedrotation = c.clone();
  }
  this.buildAll_LocalAnimatedMatrices();
  return true;
};
CL3D.SkinnedMesh.prototype.getFrameData = function(n, y, w, l, x, r, o, h) {
  var t = -1;
  var m = -1;
  var d = -1;
  var c = y.PositionKeys;
  var u = y.ScaleKeys;
  var a = y.RotationKeys;
  var g;
  var b;
  var q;
  var p;
  var k;
  var j;
  if (c.length) {
    t = -1;
    if (t == -1) {
      for (p = 0;p < c.length;++p) {
        g = c[p];
        if (g.frame >= n) {
          t = p;
          l = p;
          break;
        }
      }
    }
    if (t != -1) {
      if (this.InterpolationMode == 0 || t == 0) {
        g = c[t];
        w = g.position.clone();
      } else {
        if (this.InterpolationMode == 1) {
          g = c[t];
          var f = c[t - 1];
          k = n - g.frame;
          j = f.frame - n;
          w.setTo(f.position.substract(g.position).multiplyThisWithScalReturnMe(1 / (k + j)).multiplyThisWithScalReturnMe(k).addToThisReturnMe(g.position));
        }
      }
    }
  }
  if (u.length) {
    m = -1;
    if (m == -1) {
      for (p = 0;p < u.length;++p) {
        b = u[p];
        if (b.frame >= n) {
          m = p;
          r = p;
          break;
        }
      }
    }
    if (m != -1) {
      if (this.InterpolationMode == 0 || m == 0) {
        b = u[m];
        x = b.scale.clone();
      } else {
        if (this.InterpolationMode == 1) {
          b = u[m];
          var v = u[m - 1];
          k = n - b.frame;
          j = v.frame - n;
          x.setTo(v.scale.substract(b.scale).multiplyThisWithScalReturnMe(1 / (k + j)).multiplyThisWithScalReturnMe(k).addToThisReturnMe(b.scale));
        }
      }
    }
  }
  if (a.length) {
    d = -1;
    if (d == -1) {
      for (p = 0;p < a.length;++p) {
        q = a[p];
        if (q.frame >= n) {
          d = p;
          h = p;
          break;
        }
      }
    }
    if (d != -1) {
      if (this.InterpolationMode == 0 || d == 0) {
        q = a[d];
        o = q.rotation.clone();
      } else {
        if (this.InterpolationMode == 1) {
          q = a[d];
          var e = a[d - 1];
          k = n - q.frame;
          j = e.frame - n;
          o.slerp(q.rotation, e.rotation, k / (k + j));
        }
      }
    }
  }
};
CL3D.SkinnedMesh.prototype.buildAll_LocalAnimatedMatrices = function() {
  for (var b = 0;b < this.AllJoints.length;++b) {
    var d = this.AllJoints[b];
    if (d.PositionKeys.length || (d.ScaleKeys.length || d.RotationKeys.length)) {
      if (!d.Animatedrotation) {
        d.Animatedrotation = new CL3D.Quaternion;
      }
      if (!d.Animatedposition) {
        d.Animatedposition = new CL3D.Vect3d;
      }
      d.LocalAnimatedMatrix = d.Animatedrotation.getMatrix();
      var a = d.LocalAnimatedMatrix;
      var c = d.Animatedposition;
      a.m00 += c.X * a.m03;
      a.m01 += c.Y * a.m03;
      a.m02 += c.Z * a.m03;
      a.m04 += c.X * a.m07;
      a.m05 += c.Y * a.m07;
      a.m06 += c.Z * a.m07;
      a.m08 += c.X * a.m11;
      a.m09 += c.Y * a.m11;
      a.m10 += c.Z * a.m11;
      a.m12 += c.X * a.m15;
      a.m13 += c.Y * a.m15;
      a.m14 += c.Z * a.m15;
      a.bIsIdentity = false;
      d.GlobalSkinningSpace = false;
      if (d.ScaleKeys.length && (d.Animatedscale && !d.Animatedscale.equalsByNumbers(1, 1, 1))) {
        c = d.Animatedscale;
        a.m00 *= c.X;
        a.m01 *= c.X;
        a.m02 *= c.X;
        a.m03 *= c.X;
        a.m04 *= c.Y;
        a.m05 *= c.Y;
        a.m06 *= c.Y;
        a.m07 *= c.Y;
        a.m08 *= c.Z;
        a.m09 *= c.Z;
        a.m10 *= c.Z;
        a.m11 *= c.Z;
      }
    } else {
      d.LocalAnimatedMatrix = d.LocalMatrix.clone();
    }
  }
};
CL3D.SkinnedMesh.prototype.updateBoundingBox = function() {
  this.BoundingBox.MinEdge.set(0, 0, 0);
  this.BoundingBox.MaxEdge.set(0, 0, 0);
  if (this.LocalBuffers.length) {
    var a = this.LocalBuffers[0];
    a.recalculateBoundingBox();
    this.BoundingBox.MinEdge = a.Box.MinEdge.clone();
    this.BoundingBox.MaxEdge = a.Box.MaxEdge.clone();
    for (var c = 1;c < this.LocalBuffers.length;++c) {
      a = this.LocalBuffers[c];
      a.recalculateBoundingBox();
      if (a.Transformation == null) {
        this.BoundingBox.addInternalPointByVector(a.Box.MinEdge);
        this.BoundingBox.addInternalPointByVector(a.Box.MaxEdge);
      } else {
        var b = a.Box.clone();
        a.Transformation.transformBoxEx(b);
        this.BoundingBox.addInternalPointByVector(b.MinEdge);
        this.BoundingBox.addInternalPointByVector(b.MaxEdge);
      }
    }
  }
};
CL3D.SkinnedMesh.prototype.buildAll_GlobalAnimatedMatrices = function(e, d) {
  if (e == null) {
    for (var c = 0;c < this.RootJoints.length;++c) {
      var a = this.RootJoints[c];
      this.buildAll_GlobalAnimatedMatrices(a, null);
    }
    return;
  } else {
    if (d == null || e.GlobalSkinningSpace) {
      e.GlobalAnimatedMatrix = e.LocalAnimatedMatrix.clone();
    } else {
      e.GlobalAnimatedMatrix = d.GlobalAnimatedMatrix.multiply(e.LocalAnimatedMatrix);
    }
  }
  for (var b = 0;b < e.Children.length;++b) {
    this.buildAll_GlobalAnimatedMatrices(e.Children[b], e);
  }
};
CL3D.SkinnedMesh.prototype.skinMesh = function(f) {
  if (!this.HasAnimation) {
    return;
  }
  this.buildAll_GlobalAnimatedMatrices(null, null);
  var e = 0;
  var d = 0;
  var b;
  for (e = 0;e < this.AllJoints.length;++e) {
    var g = this.AllJoints[e];
    for (d = 0;d < g.AttachedMeshes.length;++d) {
      b = this.LocalBuffers[g.AttachedMeshes[d]];
      b.Transformation = g.GlobalAnimatedMatrix.clone();
    }
  }
  for (e = 0;e < this.LocalBuffers.length;++e) {
    var c = this.Vertices_Moved[e];
    for (d = 0;d < c.length;++d) {
      c[d] = false;
    }
  }
  for (e = 0;e < this.RootJoints.length;++e) {
    var a = this.RootJoints[e];
    this.skinJoint(a, null, f);
  }
};
CL3D.SkinnedMesh.prototype.skinJoint = function(e, b, l) {
  if (e.Weights.length) {
    var n = e.GlobalAnimatedMatrix.multiply(e.GlobalInversedMatrix);
    var d = new CL3D.Vect3d;
    var c = new CL3D.Vect3d;
    var f = this.LocalBuffers;
    var m;
    var a;
    for (var h = 0;h < e.Weights.length;++h) {
      var k = e.Weights[h];
      n.transformVect2(d, k.StaticPos);
      if (l) {
        n.rotateVect2(c, k.StaticNormal);
      }
      m = f[k.buffer_id];
      a = m.Vertices[k.vertex_id];
      if (!this.Vertices_Moved[k.buffer_id][k.vertex_id]) {
        this.Vertices_Moved[k.buffer_id][k.vertex_id] = true;
        a.Pos = d.multiplyWithScal(k.strength);
        if (l) {
          a.Normal = c.multiplyWithScal(k.strength);
        }
      } else {
        a.Pos.addToThis(d.multiplyWithScal(k.strength));
        if (l) {
          a.Normal.addToThis(c.multiplyWithScal(k.strength));
        }
      }
    }
  }
  for (var g = 0;g < e.Children.length;++g) {
    this.skinJoint(e.Children[g], e, l);
  }
};
CL3D.SkinnedMesh.prototype.getNamedAnimationRangeByName = function(e) {
  if (!e) {
    return null;
  }
  var b = this.NamedAnimationRanges.length;
  var c = e.toLowerCase();
  for (var a = 0;a < b;++a) {
    var d = this.NamedAnimationRanges[a];
    if (d.Name && d.Name.toLowerCase() == c) {
      return d;
    }
  }
  return null;
};
CL3D.SkinnedMesh.prototype.addNamedAnimationRange = function(a) {
  this.NamedAnimationRanges.push(a);
};
CL3D.TextureManager = function() {
  this.Textures = new Array;
  this.TheRenderer = null;
  this.PathRoot = "";
};
CL3D.TextureManager.prototype.getTexture = function(b, a) {
  if (b == null || b == "") {
    return null;
  }
  var c = this.getTextureFromName(b);
  if (c != null) {
    return c;
  }
  if (a) {
    c = new CL3D.Texture;
    c.Name = b;
    this.addTexture(c);
    var d = this;
    c.Image = new Image;
    c.Image.onload = function() {
      d.onTextureLoaded(c);
    };
    c.Image.src = c.Name;
    return c;
  }
  return null;
};
CL3D.TextureManager.prototype.getTextureCount = function() {
  return this.Textures.length;
};
CL3D.TextureManager.prototype.onTextureLoaded = function(a) {
  var b = this.TheRenderer;
  if (b == null) {
    return;
  }
  b.finalizeLoadedImageTexture(a);
  a.Loaded = true;
};
CL3D.TextureManager.prototype.getCountOfTexturesToLoad = function() {
  var a = 0;
  for (var c = 0;c < this.Textures.length;++c) {
    var b = this.Textures[c];
    if (b.Loaded == false) {
      ++a;
    }
  }
  return a;
};
CL3D.TextureManager.prototype.getTextureFromName = function(a) {
  for (var c = 0;c < this.Textures.length;++c) {
    var b = this.Textures[c];
    if (b.Name == a) {
      return b;
    }
  }
  return null;
};
CL3D.TextureManager.prototype.addTexture = function(a) {
  if (a != null) {
    if (this.getTextureFromName(a.Name) != null) {
      CL3D.gCCDebugOutput.print("ERROR! Cannot add the texture multiple times: " + a.Name);
    }
    this.Textures.push(a);
  }
};
CL3D.BinaryStream = function(a) {
  this._buffer = a;
  this._length = a.length;
  this._offset = 0;
  this._bitBuffer = null;
  this._bitOffset = 8;
  this.bigEndian = false;
};
CL3D.BinaryStream.prototype.bytesAvailable = function() {
  return this._length - this._offset;
};
CL3D.BinaryStream.prototype.getPosition = function() {
  return this._offset;
};
CL3D.BinaryStream.prototype.readInt = function() {
  return this.readSI32();
};
CL3D.BinaryStream.prototype.readByte = function() {
  return this.readSI8();
};
CL3D.BinaryStream.prototype.readByteAt = function(a) {
  return this._buffer.charCodeAt(a) & 255;
};
CL3D.BinaryStream.prototype.readBoolean = function() {
  return this.readSI8() != 0;
};
CL3D.BinaryStream.prototype.readShort = function() {
  return this.readUnsignedShort();
};
CL3D.BinaryStream.prototype.readNumber = function(a) {
  var c = 0;
  var d = this._offset;
  var b = d + a;
  while (b > d) {
    c = c * 256 + this.readByteAt(--b);
  }
  this._offset += a;
  return c;
};
CL3D.BinaryStream.prototype.readSNumber = function(b) {
  var c = this.readNumber(b);
  var a = 1 << b * 8 - 1;
  if (c & a) {
    c = (~c + 1) * -1;
  }
  return c;
};
CL3D.BinaryStream.prototype.readUnsignedShort = function() {
  return this.readUI16();
};
CL3D.BinaryStream.prototype.readUnsignedInt = function() {
  return this.readUI32();
};
CL3D.BinaryStream.prototype.readSI8 = function() {
  return this.readSNumber(1);
};
CL3D.BinaryStream.prototype.readSI16 = function() {
  return this.readSNumber(2);
};
CL3D.BinaryStream.prototype.readSI32 = function() {
  return this.readSNumber(4);
};
CL3D.BinaryStream.prototype.readUI8 = function() {
  return this.readNumber(1);
};
CL3D.BinaryStream.prototype.readUI16 = function() {
  return this.readNumber(2);
};
CL3D.BinaryStream.prototype.readUI24 = function() {
  return this.readNumber(3);
};
CL3D.BinaryStream.prototype.readUI32 = function() {
  return this.readNumber(4);
};
CL3D.BinaryStream.prototype.readFixed = function() {
  return this._readFixedPoint(32, 16);
};
CL3D.BinaryStream.prototype.readFixed8 = function() {
  return this._readFixedPoint(16, 8);
};
CL3D.BinaryStream.prototype._readFixedPoint = function(c, a) {
  var b = this.readSB(c);
  b = b * Math.pow(2, -a);
  return b;
};
CL3D.BinaryStream.prototype.readFloat16 = function() {
  return this.decodeFloat32fast(5, 10);
};
CL3D.BinaryStream.prototype.readFloat = function() {
  var a = this.decodeFloat32fast(this._buffer, this._offset);
  this._offset += 4;
  return a;
};
CL3D.BinaryStream.prototype.readDouble = function() {
  var a = this._buffer.substring(this._offset, this._offset + 8);
  var b = this.decodeFloat(a, 52, 11);
  this._offset += 8;
  return b;
};
CL3D.BinaryStream.prototype.decodeFloat32fast = function(d, c) {
  var h = d.charCodeAt(c + 3) & 255, g = d.charCodeAt(c + 2) & 255, f = d.charCodeAt(c + 1) & 255, e = d.charCodeAt(c + 0) & 255;
  var a = 1 - 2 * (h >> 7);
  var b = (h << 1 & 255 | g >> 7) - 127;
  var i = (g & 127) << 16 | f << 8 | e;
  if (i == 0 && b == -127) {
    return 0;
  }
  return a * (1 + i * Math.pow(2, -23)) * Math.pow(2, b);
};
CL3D.BinaryStream.prototype.decodeFloat = function(f, c, n) {
  var l = (l = new this.Buffer(this.bigEndian, f), l), g = Math.pow(2, n - 1) - 1, j = l.readBits(c + n, 1), k = l.readBits(c, n), i = 0, d = 2, a = l.buffer.length + (-c >> 3) - 1, e, h, m;
  do {
    for (e = l.buffer[++a], h = c % 8 || 8, m = 1 << h;m >>= 1;e & m && (i += 1 / d), d *= 2) {
    }
  } while (c -= h);
  return k == (g << 1) + 1 ? i ? NaN : j ? -Infinity : +Infinity : (1 + j * -2) * (k || i ? !k ? Math.pow(2, -g + 1) * i : Math.pow(2, k - g) * (1 + i) : 0);
};
CL3D.BinaryStream.prototype.Buffer = function(b, a) {
  this.bigEndian = b || 0, this.buffer = [], this.setBuffer(a);
};
CL3D.BinaryStream.prototype.Buffer.prototype.readBits = function(b, d) {
  function c(k, j) {
    for (++j;--j;k = ((k %= 2147483647 + 1) & 1073741824) == 1073741824 ? k * 2 : (k - 1073741824) * 2 + 2147483647 + 1) {
    }
    return k;
  }
  if (b < 0 || d <= 0) {
    return 0;
  }
  for (var e, f = b % 8, a = this.buffer.length - (b >> 3) - 1, i = this.buffer.length + (-(b + d) >> 3), h = a - i, g = (this.buffer[a] >> f & (1 << (h ? 8 - f : d)) - 1) + (h && (e = (b + d) % 8) ? (this.buffer[i++] & (1 << e) - 1) << (h-- << 3) - f : 0);h;g += c(this.buffer[i++], (h-- << 3) - f)) {
  }
  return g;
};
CL3D.BinaryStream.prototype.Buffer.prototype.setBuffer = function(e) {
  if (e) {
    for (var c, d = c = e.length, a = this.buffer = new Array(c);d;a[c - d] = e.charCodeAt(--d)) {
    }
    this.bigEndian && a.reverse();
  }
};
CL3D.BinaryStream.prototype.Buffer.prototype.hasNeededBits = function(a) {
  return this.buffer.length >= -(-a >> 3);
};
CL3D.BinaryStream.prototype.readSB = function(c) {
  var b = this.readUB(c);
  var a = 1 << c - 1;
  if (b & a) {
    b -= Math.pow(2, c);
  }
  return b;
};
CL3D.BinaryStream.prototype.readUB = function(e) {
  var d = 0;
  var c = this;
  var b = e;
  while (b--) {
    if (c._bitOffset == 8) {
      c._bitBuffer = c.readUI8();
      c._bitOffset = 0;
    }
    var a = 128 >> c._bitOffset;
    d = d * 2 + (c._bitBuffer & a ? 1 : 0);
    c._bitOffset++;
  }
  return d;
};
CL3D.BinaryStream.prototype.readFB = function(a) {
  return this._readFixedPoint(a, 16);
};
CL3D.BinaryStream.prototype.readString = function(d) {
  var c = [];
  var a = d || this._length - this._offset;
  while (a--) {
    var b = this.readNumber(1);
    if (d || b) {
      c.push(String.fromCharCode(b));
    } else {
      break;
    }
  }
  return c.join("");
};
CL3D.BinaryStream.prototype.readBool = function(a) {
  return!!this.readUB(a || 1);
};
CL3D.BinaryStream.prototype.tell = function() {
  return this._offset;
};
CL3D.BinaryStream.prototype.seek = function(a, b) {
  this._offset = (b ? 0 : this._offset) + a;
  return this;
};
CL3D.BinaryStream.prototype.reset = function() {
  this._offset = 0;
  return this;
};
CL3D.Renderer = function() {
  this.canvas = null;
  this.gl = null;
  this.width = 0;
  this.height = 0;
  this.textureWasLoadedFlag = false;
  this.Projection = new CL3D.Matrix4;
  this.View = new CL3D.Matrix4;
  this.World = new CL3D.Matrix4;
  this.AmbientLight = new CL3D.ColorF;
  this.AmbientLight.R = 0;
  this.AmbientLight.G = 0;
  this.AmbientLight.B = 0;
  this.programStandardMaterial = null;
  this.programLightmapMaterial = null;
  this.MaterialPrograms = new Array;
  this.MaterialProgramsWithLight = new Array;
  this.MinExternalMaterialTypeId = 20;
  this.Program2DDrawingColorOnly = null;
  this.Program2DDrawingTextureOnly = null;
  this.Program2DDrawingCanvasFontColor = null;
  this.OnChangeMaterial = null;
  this.StaticBillboardMeshBuffer = null;
  this.Lights = new Array;
  this.currentGLProgram = null;
  this.firefox5BugPrinted = false;
};
CL3D.Renderer.prototype.OnChangeMaterial = null;
CL3D.Renderer.prototype.getWidth = function() {
  return this.width;
};
CL3D.Renderer.prototype.getAndResetTextureWasLoadedFlag = function() {
  var a = this.textureWasLoadedFlag;
  this.textureWasLoadedFlag = false;
  return a;
};
CL3D.Renderer.prototype.getWebGL = function() {
  return this.gl;
};
CL3D.Renderer.prototype.getHeight = function() {
  return this.height;
};
CL3D.Renderer.prototype.registerFrame = function() {
};
CL3D.Renderer.prototype.drawMesh = function(c) {
  if (c == null) {
    return;
  }
  for (var b = 0;b < c.MeshBuffers.length;++b) {
    var a = c.MeshBuffers[b];
    this.setMaterial(a.Mat);
    this.drawMeshBuffer(a);
  }
};
CL3D.Renderer.prototype.setMaterial = function(b) {
  if (b == null) {
    return;
  }
  var d = this.gl;
  if (d == null) {
    return;
  }
  var a = null;
  try {
    if (b.Lighting) {
      a = this.MaterialProgramsWithLight[b.Type];
    } else {
      a = this.MaterialPrograms[b.Type];
    }
  } catch (c) {
  }
  if (a == null) {
    return;
  }
  this.currentGLProgram = a;
  d.useProgram(a);
  if (this.OnChangeMaterial != null) {
    try {
      this.OnChangeMaterial(b.Type);
    } catch (c) {
    }
  }
  if (a.blendenabled) {
    d.enable(d.BLEND);
    d.blendFunc(a.blendsfactor, a.blenddfactor);
  } else {
    d.disable(d.BLEND);
  }
  if (!b.ZWriteEnabled || b.isTransparent()) {
    d.depthMask(false);
  } else {
    d.depthMask(true);
  }
  if (b.ZReadEnabled) {
    d.enable(d.DEPTH_TEST);
  } else {
    d.disable(d.DEPTH_TEST);
  }
  if (b.BackfaceCulling) {
    d.enable(d.CULL_FACE);
  } else {
    d.disable(d.CULL_FACE);
  }
  if (b.Tex1 && b.Tex1.Loaded) {
    d.activeTexture(d.TEXTURE0);
    d.bindTexture(d.TEXTURE_2D, b.Tex1.Texture);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, b.ClampTexture1 ? d.CLAMP_TO_EDGE : d.REPEAT);
    d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, b.ClampTexture1 ? d.CLAMP_TO_EDGE : d.REPEAT);
  } else {
    d.activeTexture(d.TEXTURE0);
    d.bindTexture(d.TEXTURE_2D, null);
  }
  d.uniform1i(d.getUniformLocation(a, "texture1"), 0);
  if (b.Tex2 && b.Tex2.Loaded) {
    d.activeTexture(d.TEXTURE1);
    d.bindTexture(d.TEXTURE_2D, b.Tex2.Texture);
  } else {
    d.activeTexture(d.TEXTURE1);
    d.bindTexture(d.TEXTURE_2D, null);
  }
  d.uniform1i(d.getUniformLocation(a, "texture2"), 1);
};
CL3D.Renderer.prototype.drawMeshBuffer = function(a, b) {
  if (a == null) {
    return;
  }
  if (this.gl == null) {
    return;
  }
  if (a.RendererNativeArray == null) {
    this.createRendererNativeArray(a);
  } else {
    if (a.OnlyUpdateBufferIfPossible) {
      this.updateRendererNativeArray(a);
    } else {
      if (a.OnlyPositionsChanged) {
        this.updatePositionsInRendererNativeArray(a);
      }
    }
  }
  a.OnlyPositionsChanged = false;
  a.OnlyUpdateBufferIfPossible = false;
  this.drawWebGlStaticGeometry(a.RendererNativeArray, b);
};
CL3D.Renderer.prototype.updateRendererNativeArray = function(a) {
  if (a.Vertices.length == 0 || a.Indices.length == 0) {
    return;
  }
  if (a.RendererNativeArray.vertexCount < a.Vertices.length || a.RendererNativeArray.indexCount < a.Indices.length) {
    a.RendererNativeArray = null;
    this.createRendererNativeArray(a);
    return;
  }
  if (a.RendererNativeArray != null) {
    var d = this.gl;
    var e = a.Vertices.length;
    var f = a.RendererNativeArray.positionsArray;
    var k = a.RendererNativeArray.colorArray;
    for (var c = 0;c < e;++c) {
      var l = a.Vertices[c];
      f[c * 3 + 0] = l.Pos.X;
      f[c * 3 + 1] = l.Pos.Y;
      f[c * 3 + 2] = l.Pos.Z;
      k[c * 4 + 0] = CL3D.getRed(l.Color) / 255;
      k[c * 4 + 1] = CL3D.getGreen(l.Color) / 255;
      k[c * 4 + 2] = CL3D.getBlue(l.Color) / 255;
      k[c * 4 + 3] = CL3D.getAlpha(l.Color) / 255;
    }
    d.bindBuffer(d.ARRAY_BUFFER, a.RendererNativeArray.positionBuffer);
    d.bufferSubData(d.ARRAY_BUFFER, 0, f);
    d.bindBuffer(d.ARRAY_BUFFER, a.RendererNativeArray.colorBuffer);
    d.bufferSubData(d.ARRAY_BUFFER, 0, k);
    if (a.RendererNativeArray.indexCount < a.Indices.length) {
      var g = a.Indices.length;
      var h = new WebGLUnsignedShortArray(g);
      for (var b = 0;b < g;b += 3) {
        h[b + 0] = a.Indices[b + 0];
        h[b + 1] = a.Indices[b + 2];
        h[b + 2] = a.Indices[b + 1];
      }
      a.RendererNativeArray.indexBuffer = d.createBuffer();
      d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, a.RendererNativeArray.indexBuffer);
      d.bufferData(d.ELEMENT_ARRAY_BUFFER, h, d.STATIC_DRAW);
      d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, null);
    }
    a.RendererNativeArray.indexCount = a.Indices.length;
    a.RendererNativeArray.vertexCount = a.Vertices.length;
  }
};
CL3D.Renderer.prototype.updatePositionsInRendererNativeArray = function(c) {
  if (c.RendererNativeArray != null) {
    var f = this.gl;
    var a = c.Vertices.length;
    var e = c.RendererNativeArray.positionsArray;
    for (var d = 0;d < a;++d) {
      var b = c.Vertices[d];
      e[d * 3 + 0] = b.Pos.X;
      e[d * 3 + 1] = b.Pos.Y;
      e[d * 3 + 2] = b.Pos.Z;
    }
    f.bindBuffer(f.ARRAY_BUFFER, c.RendererNativeArray.positionBuffer);
    f.bufferSubData(f.ARRAY_BUFFER, 0, e);
  }
};
CL3D.Renderer.prototype.createRendererNativeArray = function(u) {
  if (u.RendererNativeArray == null) {
    var n = this.gl;
    var k = new Object;
    var q = u.Vertices.length;
    var r = new WebGLFloatArray(q * 3);
    var x = new WebGLFloatArray(q * 3);
    var h = new WebGLFloatArray(q * 2);
    var a = new WebGLFloatArray(q * 2);
    var f = new WebGLFloatArray(q * 4);
    var p = null;
    var e = null;
    if (u.Tangents) {
      p = new WebGLFloatArray(q * 3);
    }
    if (u.Binormals) {
      e = new WebGLFloatArray(q * 3);
    }
    for (var o = 0;o < q;++o) {
      var g = u.Vertices[o];
      r[o * 3 + 0] = g.Pos.X;
      r[o * 3 + 1] = g.Pos.Y;
      r[o * 3 + 2] = g.Pos.Z;
      x[o * 3 + 0] = g.Normal.X;
      x[o * 3 + 1] = g.Normal.Y;
      x[o * 3 + 2] = g.Normal.Z;
      h[o * 2 + 0] = g.TCoords.X;
      h[o * 2 + 1] = g.TCoords.Y;
      a[o * 2 + 0] = g.TCoords2.X;
      a[o * 2 + 1] = g.TCoords2.Y;
      f[o * 4 + 0] = CL3D.getRed(g.Color) / 255;
      f[o * 4 + 1] = CL3D.getGreen(g.Color) / 255;
      f[o * 4 + 2] = CL3D.getBlue(g.Color) / 255;
      f[o * 4 + 3] = CL3D.getAlpha(g.Color) / 255;
    }
    if (p && e) {
      for (var o = 0;o < q;++o) {
        var l = u.Tangents[o];
        p[o * 3 + 0] = l.X;
        p[o * 3 + 1] = l.Y;
        p[o * 3 + 2] = l.Z;
        var w = u.Binormals[o];
        e[o * 3 + 0] = w.X;
        e[o * 3 + 1] = w.Y;
        e[o * 3 + 2] = w.Z;
      }
    }
    var c = u.Indices.length;
    var d = new WebGLUnsignedShortArray(c);
    for (var m = 0;m < c;m += 3) {
      d[m + 0] = u.Indices[m + 0];
      d[m + 1] = u.Indices[m + 2];
      d[m + 2] = u.Indices[m + 1];
    }
    k.positionBuffer = n.createBuffer();
    n.bindBuffer(n.ARRAY_BUFFER, k.positionBuffer);
    n.bufferData(n.ARRAY_BUFFER, r, n.DYNAMIC_DRAW);
    k.positionsArray = r;
    k.texcoordsBuffer = n.createBuffer();
    n.bindBuffer(n.ARRAY_BUFFER, k.texcoordsBuffer);
    n.bufferData(n.ARRAY_BUFFER, h, n.STATIC_DRAW);
    k.texcoordsBuffer2 = n.createBuffer();
    n.bindBuffer(n.ARRAY_BUFFER, k.texcoordsBuffer2);
    n.bufferData(n.ARRAY_BUFFER, a, n.STATIC_DRAW);
    k.normalBuffer = n.createBuffer();
    n.bindBuffer(n.ARRAY_BUFFER, k.normalBuffer);
    n.bufferData(n.ARRAY_BUFFER, x, n.STATIC_DRAW);
    if (p && e) {
      k.tangentBuffer = n.createBuffer();
      n.bindBuffer(n.ARRAY_BUFFER, k.tangentBuffer);
      n.bufferData(n.ARRAY_BUFFER, p, n.STATIC_DRAW);
      k.binormalBuffer = n.createBuffer();
      n.bindBuffer(n.ARRAY_BUFFER, k.binormalBuffer);
      n.bufferData(n.ARRAY_BUFFER, e, n.STATIC_DRAW);
    }
    n.bindBuffer(n.ARRAY_BUFFER, null);
    k.colorBuffer = n.createBuffer();
    n.bindBuffer(n.ARRAY_BUFFER, k.colorBuffer);
    n.bufferData(n.ARRAY_BUFFER, f, n.STATIC_DRAW);
    k.colorArray = f;
    n.bindBuffer(n.ARRAY_BUFFER, null);
    k.indexBuffer = n.createBuffer();
    n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, k.indexBuffer);
    n.bufferData(n.ELEMENT_ARRAY_BUFFER, d, n.STATIC_DRAW);
    n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, null);
    k.gl = n;
    k.indexCount = c;
    k.vertexCount = q;
    u.RendererNativeArray = k;
    u.OnlyPositionsChanged = false;
    u.OnlyUpdateBufferIfPossible = false;
  }
};
CL3D.Renderer.prototype.drawWebGlStaticGeometry = function(a, f) {
  var i = this.gl;
  var g = a.tangentBuffer && a.binormalBuffer;
  i.enableVertexAttribArray(0);
  i.enableVertexAttribArray(1);
  i.enableVertexAttribArray(2);
  i.enableVertexAttribArray(3);
  i.enableVertexAttribArray(4);
  i.bindBuffer(i.ARRAY_BUFFER, a.positionBuffer);
  i.vertexAttribPointer(0, 3, i.FLOAT, false, 0, 0);
  i.bindBuffer(i.ARRAY_BUFFER, a.texcoordsBuffer);
  i.vertexAttribPointer(1, 2, i.FLOAT, false, 0, 0);
  i.bindBuffer(i.ARRAY_BUFFER, a.texcoordsBuffer2);
  i.vertexAttribPointer(2, 2, i.FLOAT, false, 0, 0);
  i.bindBuffer(i.ARRAY_BUFFER, a.normalBuffer);
  i.vertexAttribPointer(3, 3, i.FLOAT, false, 0, 0);
  i.bindBuffer(i.ARRAY_BUFFER, a.colorBuffer);
  i.vertexAttribPointer(4, 4, i.FLOAT, false, 0, 0);
  if (g) {
    i.enableVertexAttribArray(5);
    i.enableVertexAttribArray(6);
    i.bindBuffer(i.ARRAY_BUFFER, a.tangentBuffer);
    i.vertexAttribPointer(5, 3, i.FLOAT, false, 0, 0);
    i.bindBuffer(i.ARRAY_BUFFER, a.binormalBuffer);
    i.vertexAttribPointer(6, 3, i.FLOAT, false, 0, 0);
  }
  i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, a.indexBuffer);
  var d = new CL3D.Matrix4(false);
  this.Projection.copyTo(d);
  d = d.multiply(this.View);
  d = d.multiply(this.World);
  var c = this.currentGLProgram;
  if (c.locWorldViewProj != null) {
    i.uniformMatrix4fv(c.locWorldViewProj, false, this.getMatrixAsWebGLFloatArray(d));
  }
  if (c.locNormalMatrix != null) {
    var e = new CL3D.Matrix4(true);
    e = e.multiply(this.View);
    e = e.multiply(this.World);
    e.makeInverse();
    e = e.getTransposed();
    i.uniformMatrix4fv(c.locNormalMatrix, false, this.getMatrixAsWebGLFloatArray(e));
  }
  if (c.locModelViewMatrix != null) {
    var h = new CL3D.Matrix4(true);
    h = h.multiply(this.View);
    h = h.multiply(this.World);
    i.uniformMatrix4fv(c.locModelViewMatrix, false, this.getMatrixAsWebGLFloatArray(h));
  }
  if (c.locModelWorldMatrix != null) {
    i.uniformMatrix4fv(c.locModelWorldMatrix, false, this.getMatrixAsWebGLFloatArray(this.World.getTransposed()));
  }
  if (c.locLightPositions != null) {
    this.setDynamicLightsIntoConstants(c, g, g);
  }
  if (f == null) {
    f = a.indexCount;
  }
  i.drawElements(i.TRIANGLES, f, i.UNSIGNED_SHORT, 0);
  if (g) {
    i.disableVertexAttribArray(5);
    i.disableVertexAttribArray(6);
  }
};
CL3D.Renderer.prototype.setDynamicLightsIntoConstants = function(f, o, a) {
  var c = new ArrayBuffer(4 * 4 * Float32Array.BYTES_PER_ELEMENT);
  var g = new WebGLFloatArray(c);
  var b = new ArrayBuffer(5 * 4 * Float32Array.BYTES_PER_ELEMENT);
  var k = new WebGLFloatArray(b);
  var n = new CL3D.Matrix4(true);
  if (!o && (this.Lights != null && this.Lights.length > 0)) {
    this.World.getInverse(n);
  }
  for (var e = 0;e < 4;++e) {
    var j = e * 4;
    if (this.Lights != null && e < this.Lights.length) {
      var d = this.Lights[e];
      var m = n.getTransformedVect(d.Position);
      g[j] = m.X;
      g[j + 1] = m.Y;
      g[j + 2] = m.Z;
      var h = 1;
      if (a) {
        h = 1 / (d.Radius * d.Radius);
      } else {
        h = d.Attenuation;
      }
      g[j + 3] = h;
      k[j] = d.Color.R;
      k[j + 1] = d.Color.G;
      k[j + 2] = d.Color.B;
      k[j + 3] = 1;
    } else {
      g[j] = 1;
      g[j + 1] = 0;
      g[j + 2] = 0;
      g[j + 3] = 1;
      k[j] = 0;
      k[j + 1] = 0;
      k[j + 2] = 0;
      k[j + 3] = 1;
    }
  }
  k[16] = this.AmbientLight.R;
  k[17] = this.AmbientLight.G;
  k[18] = this.AmbientLight.B;
  k[19] = 1;
  this.gl.uniform4fv(f.locLightPositions, g);
  this.gl.uniform4fv(f.locLightColors, k);
};
CL3D.Renderer.prototype.draw3DLine = function(b, a) {
};
CL3D.Renderer.prototype.draw2DRectangle = function(j, h, a, o, b, e) {
  if (a <= 0 || (o <= 0 || (this.width == 0 || this.height == 0))) {
    return;
  }
  var m = true;
  if (e == null || e == false) {
    m = false;
  }
  var d = this.gl;
  d.enableVertexAttribArray(0);
  d.disableVertexAttribArray(1);
  d.disableVertexAttribArray(2);
  d.disableVertexAttribArray(3);
  d.disableVertexAttribArray(4);
  h = this.height - h;
  var n = 2 / this.width;
  var l = 2 / this.height;
  j = j * n - 1;
  h = h * l - 1;
  a *= n;
  o *= l;
  var g = new WebGLFloatArray(4 * 3);
  g[0] = j;
  g[1] = h;
  g[2] = 0;
  g[3] = j + a;
  g[4] = h;
  g[5] = 0;
  g[6] = j + a;
  g[7] = h - o;
  g[8] = 0;
  g[9] = j;
  g[10] = h - o;
  g[11] = 0;
  var i = 6;
  var k = new WebGLUnsignedShortArray(i);
  k[0] = 0;
  k[1] = 2;
  k[2] = 1;
  k[3] = 0;
  k[4] = 3;
  k[5] = 2;
  var f = d.createBuffer();
  d.bindBuffer(d.ARRAY_BUFFER, f);
  d.bufferData(d.ARRAY_BUFFER, g, d.STATIC_DRAW);
  d.vertexAttribPointer(0, 3, d.FLOAT, false, 0, 0);
  var c = d.createBuffer();
  d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, c);
  d.bufferData(d.ELEMENT_ARRAY_BUFFER, k, d.STATIC_DRAW);
  this.currentGLProgram = this.Program2DDrawingColorOnly;
  d.useProgram(this.currentGLProgram);
  d.uniform4f(d.getUniformLocation(this.currentGLProgram, "vColor"), CL3D.getRed(b) / 255, CL3D.getGreen(b) / 255, CL3D.getBlue(b) / 255, m ? CL3D.getAlpha(b) / 255 : 1);
  d.depthMask(false);
  d.disable(d.DEPTH_TEST);
  if (!m) {
    d.disable(d.BLEND);
  } else {
    d.enable(d.BLEND);
    d.blendFunc(d.SRC_ALPHA, d.ONE_MINUS_SRC_ALPHA);
  }
  d.drawElements(d.TRIANGLES, i, d.UNSIGNED_SHORT, 0);
  d.deleteBuffer(f);
  d.deleteBuffer(c);
};
CL3D.Renderer.prototype.draw2DImage = function(h, g, l, k, t, n, u, j, d) {
  if (t == null || (t.isLoaded() == false || (l <= 0 || (k <= 0 || (this.width == 0 || this.height == 0))))) {
    return;
  }
  if (j == null) {
    j = 1;
  }
  if (d == null) {
    d = 1;
  }
  var f = true;
  if (n == null || n == false) {
    f = false;
  }
  var o = this.gl;
  o.enableVertexAttribArray(0);
  o.enableVertexAttribArray(1);
  o.disableVertexAttribArray(2);
  o.disableVertexAttribArray(3);
  o.disableVertexAttribArray(4);
  g = this.height - g;
  var e = 2 / this.width;
  var r = 2 / this.height;
  h = h * e - 1;
  g = g * r - 1;
  l *= e;
  k *= r;
  var p = new WebGLFloatArray(4 * 3);
  p[0] = h;
  p[1] = g;
  p[2] = 0;
  p[3] = h + l;
  p[4] = g;
  p[5] = 0;
  p[6] = h + l;
  p[7] = g - k;
  p[8] = 0;
  p[9] = h;
  p[10] = g - k;
  p[11] = 0;
  var i = new WebGLFloatArray(4 * 2);
  i[0] = 0;
  i[1] = 0;
  i[2] = j;
  i[3] = 0;
  i[4] = j;
  i[5] = d;
  i[6] = 0;
  i[7] = d;
  var a = 6;
  var b = new WebGLUnsignedShortArray(a);
  b[0] = 0;
  b[1] = 2;
  b[2] = 1;
  b[3] = 0;
  b[4] = 3;
  b[5] = 2;
  var m = o.createBuffer();
  o.bindBuffer(o.ARRAY_BUFFER, m);
  o.bufferData(o.ARRAY_BUFFER, p, o.STATIC_DRAW);
  o.vertexAttribPointer(0, 3, o.FLOAT, false, 0, 0);
  var q = o.createBuffer();
  o.bindBuffer(o.ARRAY_BUFFER, q);
  o.bufferData(o.ARRAY_BUFFER, i, o.STATIC_DRAW);
  o.vertexAttribPointer(1, 2, o.FLOAT, false, 0, 0);
  var c = o.createBuffer();
  o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, c);
  o.bufferData(o.ELEMENT_ARRAY_BUFFER, b, o.STATIC_DRAW);
  if (u == null) {
    this.currentGLProgram = this.Program2DDrawingTextureOnly;
  } else {
    this.currentGLProgram = u;
  }
  o.useProgram(this.currentGLProgram);
  o.depthMask(false);
  o.disable(o.DEPTH_TEST);
  if (!f) {
    o.disable(o.BLEND);
  } else {
    o.enable(o.BLEND);
    o.blendFunc(o.SRC_ALPHA, o.ONE_MINUS_SRC_ALPHA);
  }
  o.activeTexture(o.TEXTURE0);
  o.bindTexture(o.TEXTURE_2D, t.getWebGLTexture());
  o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_S, o.CLAMP_TO_EDGE);
  o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_T, o.CLAMP_TO_EDGE);
  o.activeTexture(o.TEXTURE1);
  o.bindTexture(o.TEXTURE_2D, null);
  o.drawElements(o.TRIANGLES, a, o.UNSIGNED_SHORT, 0);
  o.deleteBuffer(q);
  o.deleteBuffer(m);
  o.deleteBuffer(c);
};
CL3D.Renderer.prototype.draw2DFontImage = function(b, h, e, a, d, c) {
  if (d == null || (d.isLoaded() == false || (e <= 0 || (a <= 0 || (this.width == 0 || this.height == 0))))) {
    return;
  }
  var g = true;
  var f = this.gl;
  this.currentGLProgram = this.Program2DDrawingCanvasFontColor;
  f.useProgram(this.currentGLProgram);
  f.uniform4f(f.getUniformLocation(this.currentGLProgram, "vColor"), CL3D.getRed(c) / 255, CL3D.getGreen(c) / 255, CL3D.getBlue(c) / 255, g ? CL3D.getAlpha(c) / 255 : 1);
  this.draw2DImage(b, h, e, a, d, g, this.Program2DDrawingCanvasFontColor, d.OriginalWidth / d.CachedWidth, d.OriginalHeight / d.CachedHeight);
};
CL3D.Renderer.prototype.beginScene = function(a) {
  if (this.gl == null) {
    return;
  }
  this.ensuresizeok();
  var b = this.gl;
  b.depthMask(true);
  b.clearColor(CL3D.getRed(a) / 255, CL3D.getGreen(a) / 255, CL3D.getBlue(a) / 255, 1);
  b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
};
CL3D.Renderer.prototype.endScene = function() {
  if (this.gl == null) {
    return;
  }
  var a = this.gl;
  a.flush();
};
CL3D.Renderer.prototype.clearDynamicLights = function() {
  this.Lights = new Array;
};
CL3D.Renderer.prototype.addDynamicLight = function(a) {
  this.Lights.push(a);
};
CL3D.Renderer.prototype.ensuresizeok = function() {
  if (this.canvas == null || this.gl == null) {
    return;
  }
  if (this.width == this.canvas.width && this.height == this.canvas.height) {
    return;
  }
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  var a = this.gl;
  if (a.viewport) {
    a.viewport(0, 0, this.width, this.height);
  }
};
CL3D.Renderer.prototype.init = function(a) {
  this.canvas = a;
  this.gl = null;
  try {
    var d = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d", "3d"];
    for (var b = 0;b < d.length;b++) {
      try {
        this.gl = this.canvas.getContext(d[b], {alpha:false});
        if (this.gl != null) {
          break;
        }
      } catch (c) {
      }
    }
  } catch (c) {
  }
  if (this.gl == null) {
    return false;
  } else {
    this.removeCompatibilityProblems();
    this.ensureCorrectMethodNamesSetForClosure();
    this.initWebGL();
    this.ensuresizeok();
  }
  return true;
};
CL3D.Renderer.prototype.removeCompatibilityProblems = function() {
  if (typeof WebGLFloatArray == "undefined" && typeof Float32Array != "undefined") {
    try {
      WebGLFloatArray = Float32Array;
      WebGLUnsignedShortArray = Uint16Array;
    } catch (a) {
      CL3D.gCCDebugOutput.printError("Error: Float32 array types for webgl not found.");
    }
  }
  if (typeof WebGLFloatArray == "undefined" && typeof CanvasFloatArray != "undefined") {
    try {
      WebGLFloatArray = CanvasFloatArray;
      WebGLUnsignedShortArray = CanvasUnsignedShortArray;
    } catch (a) {
      CL3D.gCCDebugOutput.printError("Error: canvas array types for webgl not found.");
    }
  }
  var b = this.gl;
  if (!b.getProgramParameter) {
    b.getProgramParameter = b.getProgrami;
  }
  if (!b.getShaderParameter) {
    b.getShaderParameter = b.getShaderi;
  }
};
CL3D.Renderer.prototype.loadShader = function(d, e) {
  var c = this.gl;
  var a = c.createShader(d);
  if (a == null) {
    return null;
  }
  c.shaderSource(a, e);
  c.compileShader(a);
  if (!c.getShaderParameter(a, c.COMPILE_STATUS)) {
    var b = d == c.VERTEX_SHADER ? "vertex" : "fragment";
    CL3D.gCCDebugOutput.printError("Error loading " + b + " shader: " + c.getShaderInfoLog(a));
    return null;
  }
  return a;
};
CL3D.Renderer.prototype.createShaderProgram = function(b, f, j) {
  var e = this.gl;
  var a = b;
  var i = f;
  var g = "#ifdef GL_ES\t\t\t\t\t\t\t\t\t\t\t\t\n\tprecision mediump float;\t\t\t\t\t\t\t\t\t\n\t#endif\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n";
  if (a.indexOf("precision ") == -1) {
    a = g + b;
  }
  if (i.indexOf("precision ") == -1) {
    i = g + f;
  }
  var h = this.loadShader(e.VERTEX_SHADER, a);
  var c = this.loadShader(e.FRAGMENT_SHADER, i);
  if (!h || !c) {
    CL3D.gCCDebugOutput.print("Could not create shader program");
    return null;
  }
  var d = e.createProgram();
  e.attachShader(d, h);
  e.attachShader(d, c);
  e.bindAttribLocation(d, 0, "vPosition");
  e.bindAttribLocation(d, 1, "vTexCoord1");
  e.bindAttribLocation(d, 2, "vTexCoord2");
  e.bindAttribLocation(d, 3, "vNormal");
  e.bindAttribLocation(d, 4, "vColor");
  if (j) {
    e.bindAttribLocation(d, 5, "vBinormal");
    e.bindAttribLocation(d, 6, "vTangent");
  }
  e.linkProgram(d);
  if (!e.getProgramParameter(d, e.LINK_STATUS)) {
    CL3D.gCCDebugOutput.print("Could not link program:" + e.getProgramInfoLog(d));
  } else {
    e.useProgram(d);
    e.uniform1i(e.getUniformLocation(d, "texture1"), 0);
    e.uniform1i(e.getUniformLocation(d, "texture2"), 1);
  }
  return d;
};
CL3D.Renderer.prototype.createMaterialType = function(c, b, f, d, e) {
  var a = this.createMaterialTypeInternal(c, b, f, d, e);
  if (!a) {
    return-1;
  }
  this.MinExternalMaterialTypeId += 1;
  this.MaterialPrograms[this.MinExternalMaterialTypeId] = a;
  this.MaterialProgramsWithLight[this.MinExternalMaterialTypeId] = a;
  return this.MinExternalMaterialTypeId;
};
CL3D.Renderer.prototype.getGLProgramFromMaterialType = function(a) {
  var b = null;
  try {
    b = this.MaterialPrograms[a];
  } catch (c) {
  }
  return b;
};
CL3D.Renderer.prototype.createMaterialTypeInternal = function(a, e, h, d, f, c) {
  if (c == null) {
    c = false;
  }
  var b = this.createShaderProgram(a, e, c);
  if (b) {
    b.blendenabled = h ? h : false;
    b.blendsfactor = d;
    b.blenddfactor = f;
    var g = this.gl;
    b.locWorldViewProj = g.getUniformLocation(b, "worldviewproj");
    b.locNormalMatrix = g.getUniformLocation(b, "normaltransform");
    b.locModelViewMatrix = g.getUniformLocation(b, "modelviewtransform");
    b.locModelWorldMatrix = g.getUniformLocation(b, "worldtransform");
    b.locLightPositions = g.getUniformLocation(b, "arrLightPositions");
    b.locLightColors = g.getUniformLocation(b, "arrLightColors");
  }
  return b;
};
CL3D.Renderer.prototype.initWebGL = function() {
  var f = this.gl;
  var k = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud);
  var b = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_lightmapcombine);
  var h = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_lightmapcombine_m4);
  var a = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud, true, f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA);
  var j = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud_alpharef, true, f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA);
  var i = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud, true, f.ONE, f.ONE_MINUS_SRC_COLOR);
  var d = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform, this.fs_shader_lightmapcombine);
  var g = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform, this.fs_shader_lightmapcombine, true, f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA);
  var e = this.createMaterialTypeInternal(this.vs_shader_normaltransform_gouraud, this.fs_shader_onlyfirsttexture_gouraud);
  var c = this.createMaterialTypeInternal(this.vs_shader_normalmappedtransform, this.fs_shader_normalmapped);
  this.Program2DDrawingColorOnly = this.createMaterialTypeInternal(this.vs_shader_2ddrawing_coloronly, this.fs_shader_simplecolor);
  this.Program2DDrawingTextureOnly = this.createMaterialTypeInternal(this.vs_shader_2ddrawing_texture, this.fs_shader_onlyfirsttexture);
  this.Program2DDrawingCanvasFontColor = this.createMaterialTypeInternal(this.vs_shader_2ddrawing_texture, this.fs_shader_2ddrawing_canvasfont);
  this.MaterialPrograms[CL3D.Material.EMT_SOLID] = k;
  this.MaterialPrograms[CL3D.Material.EMT_SOLID + 1] = k;
  this.MaterialPrograms[CL3D.Material.EMT_LIGHTMAP] = b;
  this.MaterialPrograms[CL3D.Material.EMT_LIGHTMAP + 1] = b;
  this.MaterialPrograms[CL3D.Material.EMT_LIGHTMAP + 2] = b;
  this.MaterialPrograms[CL3D.Material.EMT_LIGHTMAP + 3] = h;
  this.MaterialPrograms[CL3D.Material.EMT_TRANSPARENT_ADD_COLOR] = i;
  this.MaterialPrograms[CL3D.Material.EMT_TRANSPARENT_ALPHA_CHANNEL] = a;
  this.MaterialPrograms[CL3D.Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF] = j;
  this.MaterialPrograms[CL3D.Material.EMT_REFLECTION_2_LAYER] = d;
  this.MaterialPrograms[CL3D.Material.EMT_TRANSPARENT_REFLECTION_2_LAYER] = g;
  this.MaterialPrograms[CL3D.Material.EMT_NORMAL_MAP_SOLID] = c;
  this.MaterialPrograms[23] = e;
  k = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud);
  a = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud, true, f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA);
  j = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud_alpharef, true, f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA);
  i = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud, true, f.ONE, f.ONE_MINUS_SRC_COLOR);
  d = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform_with_light, this.fs_shader_lightmapcombine_gouraud);
  g = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform_with_light, this.fs_shader_lightmapcombine_gouraud, true, f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA);
  this.MaterialProgramsWithLight[CL3D.Material.EMT_SOLID] = k;
  this.MaterialProgramsWithLight[CL3D.Material.EMT_SOLID + 1] = k;
  this.MaterialProgramsWithLight[CL3D.Material.EMT_LIGHTMAP] = b;
  this.MaterialProgramsWithLight[CL3D.Material.EMT_LIGHTMAP + 1] = b;
  this.MaterialProgramsWithLight[CL3D.Material.EMT_LIGHTMAP + 2] = b;
  this.MaterialProgramsWithLight[CL3D.Material.EMT_LIGHTMAP + 3] = h;
  this.MaterialProgramsWithLight[CL3D.Material.EMT_TRANSPARENT_ADD_COLOR] = i;
  this.MaterialProgramsWithLight[CL3D.Material.EMT_TRANSPARENT_ALPHA_CHANNEL] = a;
  this.MaterialProgramsWithLight[CL3D.Material.EMT_REFLECTION_2_LAYER] = d;
  this.MaterialProgramsWithLight[CL3D.Material.EMT_TRANSPARENT_REFLECTION_2_LAYER] = g;
  this.MaterialProgramsWithLight[CL3D.Material.EMT_NORMAL_MAP_SOLID] = c;
  f.useProgram(k);
  this.currentGLProgram = k;
  f.clearColor(0, 0, 1, 1);
  f.clearDepth(1E4);
  f.depthMask(true);
  f.enable(f.DEPTH_TEST);
  f.disable(f.BLEND);
  f.blendFunc(f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA);
  f.enable(f.CULL_FACE);
  f.cullFace(f.BACK);
};
CL3D.Renderer.prototype.setProjection = function(a) {
  a.copyTo(this.Projection);
};
CL3D.Renderer.prototype.getProjection = function() {
  return this.Projection;
};
CL3D.Renderer.prototype.setView = function(a) {
  a.copyTo(this.View);
};
CL3D.Renderer.prototype.getView = function() {
  return this.View;
};
CL3D.Renderer.prototype.getWorld = function() {
  return this.World;
};
CL3D.Renderer.prototype.setWorld = function(a) {
  if (a) {
    a.copyTo(this.World);
  }
};
CL3D.Renderer.prototype.ensureCorrectMethodNamesSetForClosure = function(a) {
};
CL3D.Renderer.prototype.getMatrixAsWebGLFloatArray = function(a) {
  return new WebGLFloatArray(a.asArray());
};
CL3D.Renderer.prototype.deleteTexture = function(a) {
  if (a == null) {
    return;
  }
  var b = this.gl;
  b.deleteTexture(a.getWebGLTexture());
  a.Texture = null;
  a.Loaded = false;
};
CL3D.Renderer.prototype.createTextureFrom2DCanvas = function(b, h) {
  var c = this.gl;
  var g = c.createTexture();
  c.bindTexture(c.TEXTURE_2D, g);
  var a = b.width;
  var k = b.height;
  var e = a;
  var f = k;
  if (!this.isPowerOfTwo(b.width) || !this.isPowerOfTwo(b.height)) {
    var d = document.createElement("canvas");
    d.width = this.nextHighestPowerOfTwo(b.width);
    d.height = this.nextHighestPowerOfTwo(b.height);
    var i = d.getContext("2d");
    if (h) {
      i.drawImage(b, 0, 0, b.width, b.height, 0, 0, b.width, b.height);
    } else {
      i.drawImage(b, 0, 0, b.width, b.height, 0, 0, d.width, d.height);
    }
    b = d;
    e = d.width;
    f = d.height;
  }
  this.fillTextureFromDOMObject(g, b);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST);
  c.generateMipmap(c.TEXTURE_2D);
  c.bindTexture(c.TEXTURE_2D, null);
  var j = new CL3D.Texture;
  j.Name = "";
  j.Texture = g;
  j.Image = null;
  j.Loaded = true;
  j.CachedWidth = e;
  j.CachedHeight = f;
  j.OriginalWidth = a;
  j.OriginalHeight = k;
  return j;
};
CL3D.Renderer.prototype.isPowerOfTwo = function(a) {
  return(a & a - 1) == 0;
};
CL3D.Renderer.prototype.nextHighestPowerOfTwo = function(a) {
  --a;
  for (var b = 1;b < 32;b <<= 1) {
    a = a | a >> b;
  }
  return a + 1;
};
CL3D.Renderer.prototype.fillTextureFromDOMObject = function(b, c) {
  var g = this.gl;
  try {
    g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, c);
  } catch (f) {
    var a = navigator.userAgent;
    if (a != null && a.indexOf("Firefox") != -1) {
      if (this.firefox5BugPrinted == false) {
        CL3D.gCCDebugOutput.printError("<i>Firefox doesn't allow loading textures from other domains and from local disk anymore.<br/>Workaround: set security.fileuri.strict_origin_policy in about:config to 'false'</i>", true);
      }
      this.firefox5BugPrinted = true;
      return;
    }
    try {
      g.texImage2D(g.TEXTURE_2D, 0, c);
    } catch (d) {
    }
  }
};
CL3D.Renderer.prototype.finalizeLoadedImageTexture = function(b) {
  var f = this.gl;
  var c = f.createTexture();
  var e = b.Image;
  if (!this.isPowerOfTwo(e.width) || !this.isPowerOfTwo(e.height)) {
    var a = document.createElement("canvas");
    if (a != null) {
      a.width = this.nextHighestPowerOfTwo(e.width);
      a.height = this.nextHighestPowerOfTwo(e.height);
      var d = a.getContext("2d");
      d.drawImage(e, 0, 0, e.width, e.height, 0, 0, a.width, a.height);
      e = a;
    }
  }
  f.bindTexture(f.TEXTURE_2D, c);
  this.fillTextureFromDOMObject(c, e);
  f.generateMipmap(f.TEXTURE_2D);
  f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.LINEAR);
  f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.LINEAR_MIPMAP_NEAREST);
  f.bindTexture(f.TEXTURE_2D, null);
  this.textureWasLoadedFlag = true;
  b.Texture = c;
};
CL3D.Renderer.prototype.getStaticBillboardMeshBuffer = function() {
  if (this.StaticBillboardMeshBuffer == null) {
    this.createStaticBillboardMeshBuffer();
  }
  return this.StaticBillboardMeshBuffer;
};
CL3D.Renderer.prototype.createStaticBillboardMeshBuffer = function() {
  if (this.StaticBillboardMeshBuffer != null) {
    return;
  }
  var f = null;
  f = new CL3D.MeshBuffer;
  var g = new CL3D.Vertex3D(true);
  var e = new CL3D.Vertex3D(true);
  var c = new CL3D.Vertex3D(true);
  var b = new CL3D.Vertex3D(true);
  var d = f.Indices;
  d.push(0);
  d.push(2);
  d.push(1);
  d.push(0);
  d.push(3);
  d.push(2);
  var a = f.Vertices;
  a.push(g);
  a.push(e);
  a.push(c);
  a.push(b);
  g.TCoords.X = 1;
  g.TCoords.Y = 1;
  g.Pos.set(1, -1, 0);
  e.TCoords.X = 1;
  e.TCoords.Y = 0;
  e.Pos.set(1, 1, 0);
  c.TCoords.X = 0;
  c.TCoords.Y = 0;
  c.Pos.set(-1, 1, 0);
  b.TCoords.X = 0;
  b.TCoords.Y = 1;
  b.Pos.set(-1, -1, 0);
  this.StaticBillboardMeshBuffer = f;
};
CL3D.Renderer.prototype.vs_shader_2ddrawing_coloronly = "\t\t\t\tattribute vec4 vPosition;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t        gl_Position = vPosition;\t\t\t\t\t\t\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.vs_shader_2ddrawing_texture = "\t\t\t\t\tattribute vec4 vPosition;\t\t\t\t\t\t\t\t\t\tattribute vec4 vTexCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t        gl_Position = vPosition;\t\t\t\t\t\t\t\t\t\tv_texCoord1 = vTexCoord1.st;\t\t\t\t\t\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.fs_shader_simplecolor = "\t\t\t\t\t\tuniform vec4 vColor;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t         gl_FragColor = vColor;\t\t\t\t\t\t\t\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.fs_shader_2ddrawing_canvasfont = "\t\t\t\tuniform vec4 vColor;\t\t\t\t\t\t\t\t\t\t\tuniform sampler2D texture1;\t\t\t\t\t\t\t\t\t\tuniform sampler2D texture2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);\t\t        float alpha = texture2D(texture1, texCoord).r;\t\t        gl_FragColor = vec4(vColor.rgb, alpha);\t\t\t\t\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.vs_shader_normaltransform = "\t\t\t\t\tuniform mat4 worldviewproj;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tattribute vec4 vPosition;\t\t\t\t\t\t\t\t\t    attribute vec4 vNormal;\t\t\t\t\t\t\t\t\t\t\tattribute vec4 vColor;\t\t\t\t\t\t\t\t\t\t    attribute vec2 vTexCoord1;\t\t\t\t\t\t\t\t\t\tattribute vec2 vTexCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvarying vec4 v_color;\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tv_color = vColor;\t\t\t\t\t\t\t\t\t\t        gl_Position = worldviewproj * vPosition;\t\t\t\t        v_texCoord1 = vTexCoord1.st;\t\t\t\t\t\t\t\t\tv_texCoord2 = vTexCoord2.st;\t\t\t\t\t\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.vs_shader_normaltransform_with_light = "\t\t\t\t\tuniform mat4 worldviewproj;\t\t\t\t\t\t\t\t\t\n\tuniform vec4 arrLightPositions[4];\t\t\t\t\t\t\t\n\tuniform vec4 arrLightColors[5]; \t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tattribute vec4 vPosition;\t\t\t\t\t\t\t\t\t    attribute vec4 vNormal;\t\t\t\t\t\t\t\t\t\t\tattribute vec4 vColor;\t\t\t\t\t\t\t\t\t\t    attribute vec2 vTexCoord1;\t\t\t\t\t\t\t\t\t\tattribute vec2 vTexCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvarying vec4 v_color;\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t        gl_Position = worldviewproj * vPosition;\t\t\t\t        v_texCoord1 = vTexCoord1.st;\t\t\t\t\t\t\t\t\tv_texCoord2 = vTexCoord2.st;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\tvec3 n = normalize(vec3(vNormal.xyz));\t\t\t\t\t\t\tvec4 currentLight = vec4(0, 0, 0, 1.0);\t\t\t\t\t\t\tfor(int i=0; i<4; ++i)\t\t\t\t\t\t\t\t\t\t\t{\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvec3 lPos = vec3(arrLightPositions[i].xyz);\t\t\t\t\t\tvec3 vertexToLight = lPos - vec3(vPosition.xyz);\t\t\t\tfloat distance = length( vertexToLight );\t\t\t\t\t\tfloat distanceFact = 1.0 / (arrLightPositions[i].w * distance); \t\t\tvertexToLight = normalize(vertexToLight); \t\t\t\t\t\tfloat angle = max(0.0, dot(n, vertexToLight));\t\t\t\t\tfloat intensity = angle * distanceFact;\t\t\t\t\t\t\tcurrentLight = currentLight + vec4(arrLightColors[i].x*intensity, arrLightColors[i].y*intensity, arrLightColors[i].z*intensity, 1.0);\t\t\t\t}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcurrentLight = currentLight + arrLightColors[4];\t\t\t\tcurrentLight = max(currentLight, vec4(0.0,0.0,0.0,0.0));\t\t\tcurrentLight = currentLight * vec4(vColor.x, vColor.y, vColor.z, 1.0);\t\t\tv_color = min(currentLight, vec4(1.0,1.0,1.0,1.0));\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.vs_shader_normaltransform_gouraud = "\t\t\t\t\tuniform mat4 worldviewproj;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tattribute vec4 vPosition;\t\t\t\t\t\t\t\t\t    attribute vec2 vTexCoord1;\t\t\t\t\t\t\t\t\t\tattribute vec2 vTexCoord2;\t\t\t\t\t\t\t\t\t\tattribute vec4 vNormal;\t\t\t\t\t\t\t\t\t\t\tattribute vec4 vColor;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvarying vec4 v_color;\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t        gl_Position = worldviewproj * vPosition;\t\t\t\t        v_texCoord1 = vTexCoord1.st;\t\t\t\t\t\t\t\t\tv_texCoord2 = vTexCoord2.st;\t\t\t\t\t\t\t\t\tv_color = vColor;\t\t\t\t\t\t\t\t\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.vs_shader_reflectiontransform = "\t\t\tuniform mat4 worldviewproj;\t\t\t\t\t\t\t\t\t\n\tuniform mat4 normaltransform;\t\t\t\t\t\t\t\t\n\tuniform mat4 modelviewtransform;\t\t\t\t\t\t\t\n\tuniform mat4 worldtransform;\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tattribute vec4 vPosition;\t\t\t\t\t\t\t\t\t    attribute vec3 vNormal;\t\t\t\t\t\t\t\t\t\t    attribute vec2 vTexCoord1;\t\t\t\t\t\t\t\t\t\tattribute vec2 vTexCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\tgl_Position = worldviewproj * vPosition;\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t//\tuse reflection\t\t\t\t\t\t\t\t\t\t\t\n\t\tvec3 pos = normalize((modelviewtransform * vPosition).xyz);\t\t\t\t\t\n\t\tvec3 n = normalize((normaltransform * vec4(vNormal, 1)).xyz);\t\t\n\t\tvec3 r = reflect( pos.xyz, n.xyz );\t\t\t\t\t\t\t\n\t\tfloat m = sqrt( r.x*r.x + r.y*r.y + (r.z+1.0)*(r.z+1.0) ); \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t//\ttexture coordinates\t\t\t\t\t\t\t\t\n\t\tv_texCoord1 = vTexCoord1.st;\t\t\t\t\t\t\n\t\tv_texCoord2.x = (r.x / (2.0 * m)  + 0.5);\t\t\t\t\t\t\n\t\tv_texCoord2.y = (r.y / (2.0 * m)  + 0.5);\t\t\t\t\t\t\n    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t";
CL3D.Renderer.prototype.vs_shader_reflectiontransform_with_light = "\t\t\tuniform mat4 worldviewproj;\t\t\t\t\t\t\t\t\t\n\tuniform mat4 normaltransform;\t\t\t\t\t\t\t\t\n\tuniform mat4 modelviewtransform;\t\t\t\t\t\t\t\n\tuniform vec4 arrLightPositions[4];\t\t\t\t\t\t\t\n\tuniform vec4 arrLightColors[5]; \t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tattribute vec4 vPosition;\t\t\t\t\t\t\t\t\t    attribute vec3 vNormal;\t\t\t\t\t\t\t\t\t\t    attribute vec2 vTexCoord1;\t\t\t\t\t\t\t\t\t\tattribute vec2 vTexCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvarying vec4 v_color;\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t        gl_Position = worldviewproj * vPosition;\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t//\tuse reflection\t\t\t\t\t\t\t\t\t\t\t\n\t\tvec3 pos = normalize((modelviewtransform * vPosition).xyz);\t\t\t\t\t\n\t\tvec3 nt = normalize((normaltransform * vec4(vNormal, 1)).xyz);\t\t\n\t\tvec3 r = reflect( pos.xyz, nt.xyz );\t\t\t\t\t\t\t\n\t\tfloat m = sqrt( r.x*r.x + r.y*r.y + (r.z+1.0)*(r.z+1.0) ); \n\t\t//\ttexture coordinates\t\t\t\t\t\t\t\t\n\t\tv_texCoord1 = vTexCoord1.st;\t\t\t\t\t\t\n\t\tv_texCoord2.x = r.x / (2.0 * m)  + 0.5;\t\t\t\t\t\t\n\t\tv_texCoord2.y = r.y / (2.0 * m)  + 0.5;\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\tvec3 n = normalize(vec3(vNormal.xyz));\t\t\t\t\t\t\tvec4 currentLight = vec4(0.0, 0.0, 0.0, 1.0);\t \t\t\t\tfor(int i=0; i<4; ++i)\t\t\t\t\t\t\t\t\t\t\t{\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvec3 lPos = vec3(arrLightPositions[i].xyz);\t\t\t\t\t\tvec3 vertexToLight = lPos - vec3(vPosition.xyz);\t\t\t\tfloat distance = length( vertexToLight );\t\t\t\t\t\tfloat distanceFact = 1.0 / (arrLightPositions[i].w * distance); \t\t\tvertexToLight = normalize(vertexToLight); \t\t\t\t\t\tfloat angle = max(0.0, dot(n, vertexToLight));\t\t\t\t\tfloat intensity = angle * distanceFact;\t\t\t\t\t\t\tcurrentLight = currentLight + vec4(arrLightColors[i].x*intensity, arrLightColors[i].y*intensity, arrLightColors[i].z*intensity, 1.0);\t\t\t\t}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcurrentLight = currentLight + arrLightColors[4];\t\t\t\tcurrentLight = max(currentLight, vec4(0.0,0.0,0.0,0.0));\t\t\t//v_color = currentLight;\t\t\t\t\t\t\t\t\n\t\tv_color = min(currentLight, vec4(1.0,1.0,1.0,1.0));\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t";
CL3D.Renderer.prototype.vs_shader_normalmappedtransform = "\t\t\t\t\tuniform mat4 worldviewproj;\t\t\t\t\t\t\t\t\t\n\tuniform mat4 normaltransform;\t\t\t\t\t\t\t\t\n\tuniform mat4 worldtransform;\t\t\t\t\t\t\t\t\n\tuniform vec4 arrLightPositions[4];\t\t\t\t\t\t\t\n\tuniform vec4 arrLightColors[5]; \t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\tattribute vec4 vPosition;\t\t\t\t\t\t\t\t\t\n    attribute vec3 vNormal;\t\t\t\t\t\t\t\t\t\t\n\tattribute vec4 vColor;\t\t\t\t\t\t\t\t\t\t\n    attribute vec2 vTexCoord1;\t\t\t\t\t\t\t\t\t\n\tattribute vec2 vTexCoord2;\t\t\t\t\t\t\t\t\t\n\tattribute vec3 vBinormal;\t\t\t\t\t\t\t\t\t\n\tattribute vec3 vTangent;\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t// Output:\t\t\t\t\t\t\t\t\t\t\t\t\t\n    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\n\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\n\tvarying vec3 v_lightVector[4];\t\t\t\t\t\t\t\t\n\tvarying vec3 v_lightColor[4];\t\t\t\t\t\t\t\t\n\tvarying vec3 ambientLight;\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t\n    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n        gl_Position = worldviewproj * vPosition;\t\t\t\t\n        v_texCoord1 = vTexCoord1.st;\t\t\t\t\t\t\t\n\t\tv_texCoord2 = vTexCoord2.st;\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\tvec4 pos = vec4(dot(vPosition, worldtransform[0]), dot(vPosition, worldtransform[1]), dot(vPosition, worldtransform[2]), dot(vPosition, worldtransform[3]));\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t// transform normal, binormal and tangent\t\t\t\t\t\n\t\tvec3 normal = vec3(dot(vNormal.xyz, worldtransform[0].xyz), dot(vNormal.xyz, worldtransform[1].xyz), dot(vNormal.xyz, worldtransform[2].xyz));\t\t\n\t\tvec3 tangent = vec3(dot(vTangent.xyz, worldtransform[0].xyz), dot(vTangent.xyz, worldtransform[1].xyz), dot(vTangent.xyz, worldtransform[2].xyz));     \n\t\tvec3 binormal = vec3(dot(vBinormal.xyz, worldtransform[0].xyz), dot(vBinormal.xyz, worldtransform[1].xyz), dot(vBinormal.xyz, worldtransform[2].xyz));     \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\tvec3 temp = vec3(0.0, 0.0, 0.0);\t\t\t\t\t\t\n\t\tfor(int i=0; i<4; ++i) \t\t\t\t\t\t\t\t\t\n\t\t{\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\tvec3 lightPos = vec3(arrLightPositions[i].xyz);\t\t\n\t\t\tvec3 vertexToLight = lightPos - vec3(pos.xyz); \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// transform the light vector 1 with U, V, W\t\t\n\t\t\ttemp.x = dot(tangent.xyz, vertexToLight);\t\t\t\t\n\t\t\ttemp.y = dot(binormal.xyz, vertexToLight);\t\t\t\t\n\t\t\ttemp.z = dot(normal.xyz, vertexToLight);\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t// normalize light vector\t\t\t\t\t\n\t\t\ttemp = normalize(temp); \t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t// move from -1..1 to 0..1 and put into output\t\t\n\t\t\ttemp = temp * 0.5;\t\t\t\t\t\t\t\n\t\t\ttemp = temp + vec3(0.5,0.5,0.5);\t\t\t\n\t\t\tv_lightVector[i] = temp;\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t// calculate attenuation\t\t\t\t\t\n\t\t\tfloat distanceFact = 1.0 / sqrt(dot(vertexToLight, vertexToLight) * arrLightPositions[i].w); \n\t\t\tv_lightColor[i] = min(vec3(arrLightColors[i].x*distanceFact, arrLightColors[i].y*distanceFact, arrLightColors[i].z*distanceFact), vec3(1,1,1));\t\t\n\t\t}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t// ambient light\n\t\tambientLight = arrLightColors[4].xyz;\t\t\t\t\n    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t";
CL3D.Renderer.prototype.fs_shader_onlyfirsttexture = "\t\t\t\t\tuniform sampler2D texture1;\t\t\t\t\t\t\t\t\t\tuniform sampler2D texture2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);\t\t        gl_FragColor = texture2D(texture1, texCoord);\t\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.fs_shader_onlyfirsttexture_gouraud = "\t\tuniform sampler2D texture1;\t\t\t\t\t\t\t\t\t\tuniform sampler2D texture2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvarying vec4 v_color;\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);\t\t        gl_FragColor = texture2D(texture1, texCoord) * v_color;\t\n    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.fs_shader_onlyfirsttexture_gouraud_alpharef = "\t\t\tuniform sampler2D texture1;\t\t\t\t\t\t\t\t\t\tuniform sampler2D texture2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvarying vec4 v_color;\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);\t\t        gl_FragColor = texture2D(texture1, texCoord) * v_color;\t\t\tif(gl_FragColor.a < 0.5)\t\t\t\t\t\t\t\t\t\t\tdiscard;\t\t\t\t\t\t\t\t\t\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.fs_shader_lightmapcombine = "\t\t\t\t\tuniform sampler2D texture1;\t\t\t\t\t\t\t\t\t\tuniform sampler2D texture2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t        vec2 texCoord1 = vec2(v_texCoord1.s, v_texCoord1.t);\t\t\tvec2 texCoord2 = vec2(v_texCoord2.s, v_texCoord2.t);\t        vec4 col1 = texture2D(texture1, texCoord1);\t\t\t\t\t\tvec4 col2 = texture2D(texture2, texCoord2);\t\t\t\t\t\tgl_FragColor = col1 * col2;\t\t\t\t\t\t\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.fs_shader_lightmapcombine_m4 = "\t\t\tuniform sampler2D texture1;\t\t\t\t\t\t\t\t\t\tuniform sampler2D texture2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t        vec2 texCoord1 = vec2(v_texCoord1.s, v_texCoord1.t);\t\t\tvec2 texCoord2 = vec2(v_texCoord2.s, v_texCoord2.t);\t        vec4 col1 = texture2D(texture1, texCoord1);\t\t\t\t\t\tvec4 col2 = texture2D(texture2, texCoord2);\t\t\t\t\t\tgl_FragColor = col1 * col2 * 3.0;\t\t\t\t\t\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.fs_shader_lightmapcombine_gouraud = "\t\tuniform sampler2D texture1;\t\t\t\t\t\t\t\t\t\tuniform sampler2D texture2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvarying vec4 v_color;\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t        vec2 texCoord1 = vec2(v_texCoord1.s, v_texCoord1.t);\t\t\tvec2 texCoord2 = vec2(v_texCoord2.s, v_texCoord2.t);\t        vec4 col1 = texture2D(texture1, texCoord1);\t\t\t\t\t\tvec4 col2 = texture2D(texture2, texCoord2);\t\t\t\t\t\tvec4 final = col1 * col2 * v_color;\t\t\t\t\t\t\t\tgl_FragColor = vec4(final.x, final.y, final.z, col1.w);\t    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
CL3D.Renderer.prototype.fs_shader_normalmapped = "\t\tuniform sampler2D texture1;\t\t\t\t\t\t\t\t\t\tuniform sampler2D texture2;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    varying vec2 v_texCoord1;\t\t\t\t\t\t\t\t\t\tvarying vec2 v_texCoord2;\t\t\t\t\t\t\t\t\t\tvarying vec3 v_lightVector[4];\t\t\t\t\t\t\t\t\tvarying vec3 v_lightColor[4];\t\t\t\t\t\t\t\t\tvarying vec3 ambientLight;\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    void main()\t\t\t\t\t\t\t\t\t\t\t\t\t    {\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvec4 colorMapSample = texture2D(texture1, v_texCoord1);\t\t\tvec3 normalMapVector = texture2D(texture2, v_texCoord1).xyz;\t\t//normalMapVector -= vec3(0.5, 0.5, 0.5);\t\t\t\t\t\n\t\t//normalMapVector = normalize(normalMapVector); \t\t\t\n\t\tnormalMapVector *= vec3(2.0, 2.0, 2.0);\t\t\t\t\t\n\t\tnormalMapVector -= vec3(1.0, 1.0, 1.0);\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\tvec3 totallight = vec3(0.0, 0.0, 0.0);\t\t\t\t\t\t\n\t\tfor(int i=0; i<4; ++i) \t\t\t\t\t\t\t\t\t\n\t\t{\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t// process light\t\t\t\t\t\t\t\t\t\n\t\t\t//vec3 lightvect = v_lightVector[i] + vec3(-0.5, -0.5, -0.5); \n\t\t\tvec3 lightvect = (v_lightVector[i] * vec3(2.0, 2.0, 2.0)) - vec3(1.0, 1.0, 1.0); \n\t\t\tlightvect = normalize(lightvect);\t\t\t\t\t\n\t\t\tfloat luminance = dot(lightvect, normalMapVector); // normal DOT light\t\t\n\t\t\tluminance = clamp(luminance, 0.0, 1.0);\t// clamp result to positive numbers\t\t\n\t\t\tlightvect = luminance * v_lightColor[i];\t// luminance * light color \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t// add to previously calculated lights\t\t\t\t\n\t\t\ttotallight = totallight + lightvect;\t\t\t\t\n\t\t}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\ttotallight = totallight + ambientLight;\t\t\t\t\t\n\t\tgl_FragColor = colorMapSample * vec4(totallight.x, totallight.y, totallight.z, 0.0);\t\n    }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t";
CL3D.SceneNode = function() {
  this.Type = -1;
  this.Pos = new CL3D.Vect3d;
  this.Rot = new CL3D.Vect3d;
  this.Scale = new CL3D.Vect3d(1, 1, 1);
  this.Visible = true;
  this.Name = "";
  this.Culling = 0;
  this.Id = -1;
  this.Parent = null;
  this.Children = new Array;
  this.Animators = new Array;
  this.AbsoluteTransformation = new CL3D.Matrix4;
  this.scene = null;
  this.Selector = null;
};
CL3D.SceneNode.prototype.init = function() {
  this.Pos = new CL3D.Vect3d;
  this.Rot = new CL3D.Vect3d;
  this.Scale = new CL3D.Vect3d(1, 1, 1);
  this.Children = new Array;
  this.Animators = new Array;
  this.AbsoluteTransformation = new CL3D.Matrix4;
};
CL3D.SceneNode.prototype.Pos = null;
CL3D.SceneNode.prototype.Rot = null;
CL3D.SceneNode.prototype.Scale = null;
CL3D.SceneNode.prototype.Visible = true;
CL3D.SceneNode.prototype.Name = "";
CL3D.SceneNode.prototype.Id = -1;
CL3D.SceneNode.prototype.Selector = null;
CL3D.SceneNode.prototype.Parent = null;
CL3D.SceneNode.prototype.getParent = function() {
  return this.Parent;
};
CL3D.SceneNode.prototype.getChildren = function() {
  return this.Children;
};
CL3D.SceneNode.prototype.getType = function() {
  return "none";
};
CL3D.SceneNode.prototype.getBoundingBox = function() {
  return new CL3D.Box3d;
};
CL3D.SceneNode.prototype.getAnimators = function() {
  return this.Animators;
};
CL3D.SceneNode.prototype.getAnimatorOfType = function(c) {
  for (var b = 0;b < this.Animators.length;++b) {
    var a = this.Animators[b];
    if (a.getType() == c) {
      return a;
    }
  }
  return null;
};
CL3D.SceneNode.prototype.findActionOfType = function(c) {
  for (var b = 0;b < this.Animators.length;++b) {
    var a = this.Animators[b];
    var d = a.findActionByType(c);
    if (d != null) {
      return d;
    }
  }
  return null;
};
CL3D.SceneNode.prototype.getTransformedBoundingBox = function() {
  var a = this.getBoundingBox().clone();
  this.AbsoluteTransformation.transformBoxEx(a);
  return a;
};
CL3D.SceneNode.prototype.cloneMembers = function(a, g, f, k) {
  a.Name = new String(this.Name);
  a.Visible = this.Visible;
  a.Culling = this.Culling;
  a.Pos = this.Pos.clone();
  a.Rot = this.Rot.clone();
  a.Scale = this.Scale.clone();
  a.Type = this.Type;
  if (g) {
    g.addChild(a);
  }
  for (var e = 0;e < this.Children.length;++e) {
    var j = this.Children[e];
    if (j) {
      var h = j.createClone(a, -1, -1);
      if (h != null) {
        a.addChild(h);
      }
    }
  }
  for (var e = 0;e < this.Animators.length;++e) {
    var d = this.Animators[e];
    a.addAnimator(d.createClone(this, this.scene, f, k));
  }
  if (this.AbsoluteTransformation) {
    a.AbsoluteTransformation = this.AbsoluteTransformation.clone();
  }
  a.scene = this.scene;
};
CL3D.SceneNode.prototype.createClone = function(b, a, c) {
  return null;
};
CL3D.SceneNode.prototype.addAnimator = function(b) {
  if (b != null) {
    this.Animators.push(b);
  }
};
CL3D.SceneNode.prototype.removeAnimator = function(b) {
  if (b == null) {
    return;
  }
  var d;
  for (d = 0;d < this.Animators.length;++d) {
    var c = this.Animators[d];
    if (c === b) {
      this.Animators.splice(d, 1);
      return;
    }
  }
};
CL3D.SceneNode.prototype.addChild = function(a) {
  if (a) {
    a.scene = this.scene;
    if (a.Parent) {
      a.Parent.removeChild(a);
    }
    a.Parent = this;
    this.Children.push(a);
  }
};
CL3D.SceneNode.prototype.removeChild = function(b) {
  for (var a = 0;a < this.Children.length;++a) {
    if (this.Children[a] === b) {
      b.Parent = null;
      this.Children.splice(a, 1);
      return;
    }
  }
};
CL3D.SceneNode.prototype.OnRegisterSceneNode = function(b) {
  if (this.Visible) {
    for (var a = 0;a < this.Children.length;++a) {
      var d = this.Children[a];
      d.OnRegisterSceneNode(b);
    }
  }
};
CL3D.SceneNode.prototype.OnAnimate = function(h, k) {
  var e = false;
  if (this.Visible) {
    var f;
    var b = this.Animators.length;
    for (f = 0;f < b;) {
      var d = this.Animators[f];
      e = d.animateNode(this, k) || e;
      var g = b;
      b = this.Animators.length;
      if (g >= b) {
        ++f;
      }
    }
    this.updateAbsolutePosition();
    for (f = 0;f < this.Children.length;++f) {
      var j = this.Children[f];
      e = j.OnAnimate(h, k) || e;
    }
  }
  return e;
};
CL3D.SceneNode.prototype.getRelativeTransformation = function() {
  var b = new CL3D.Matrix4;
  b.setRotationDegrees(this.Rot);
  b.setTranslation(this.Pos);
  if (this.Scale.X != 1 || (this.Scale.Y != 1 || this.Scale.Z != 1)) {
    var a = new CL3D.Matrix4;
    a.setScale(this.Scale);
    b = b.multiply(a);
  }
  return b;
};
CL3D.SceneNode.prototype.updateAbsolutePosition = function() {
  if (this.Parent != null) {
    this.AbsoluteTransformation = this.Parent.AbsoluteTransformation.multiply(this.getRelativeTransformation());
  } else {
    this.AbsoluteTransformation = this.getRelativeTransformation();
  }
};
CL3D.SceneNode.prototype.render = function(a) {
};
CL3D.SceneNode.prototype.getAbsoluteTransformation = function() {
  return this.AbsoluteTransformation;
};
CL3D.SceneNode.prototype.getAbsolutePosition = function() {
  return this.AbsoluteTransformation.getTranslation();
};
CL3D.SceneNode.prototype.getMaterialCount = function() {
  return 0;
};
CL3D.SceneNode.prototype.getMaterial = function(a) {
  return null;
};
CL3D.CameraSceneNode = function() {
  this.init();
  this.Box = new CL3D.Box3d;
  this.DoesCollision = false;
  this.Active = false;
  this.Target = new CL3D.Vect3d(0, 0, 10);
  this.UpVector = new CL3D.Vect3d(0, 1, 0);
  this.Projection = new CL3D.Matrix4;
  this.ViewMatrix = new CL3D.Matrix4;
  this.Fovy = CL3D.PI / 2.5;
  this.Aspect = 4 / 3;
  this.ZNear = 0.1;
  this.ZFar = 3E3;
  this.TargetAndRotationAreBound = true;
  this.Projection.buildProjectionMatrixPerspectiveFovLH(this.Fovy, this.Aspect, this.ZNear, this.ZFar);
};
CL3D.CameraSceneNode.prototype = new CL3D.SceneNode;
CL3D.CameraSceneNode.prototype.recalculateProjectionMatrix = function() {
  this.Projection.buildProjectionMatrixPerspectiveFovLH(this.Fovy, this.Aspect, this.ZNear, this.ZFar);
};
CL3D.CameraSceneNode.prototype.getType = function() {
  return "camera";
};
CL3D.CameraSceneNode.prototype.setAspectRatio = function(b) {
  if (!CL3D.equals(this.Aspect, b)) {
    this.Aspect = b;
    this.recalculateProjectionMatrix();
  }
};
CL3D.CameraSceneNode.prototype.getAspectRatio = function() {
  return this.Aspect;
};
CL3D.CameraSceneNode.prototype.getFov = function() {
  return this.Fovy;
};
CL3D.CameraSceneNode.prototype.setFov = function(a) {
  if (!CL3D.equals(this.Fovy, a)) {
    if (isNaN(a)) {
      return;
    }
    this.Fovy = a;
    this.recalculateProjectionMatrix();
  }
};
CL3D.CameraSceneNode.prototype.setTarget = function(a) {
  if (a) {
    this.Target = a.clone();
    if (this.TargetAndRotationAreBound) {
      this.updateAbsolutePosition();
      this.Rot = a.substract(this.getAbsolutePosition()).getHorizontalAngle();
    }
  }
};
CL3D.CameraSceneNode.prototype.getTarget = function() {
  return this.Target;
};
CL3D.CameraSceneNode.prototype.getUpVector = function() {
  return this.UpVector;
};
CL3D.CameraSceneNode.prototype.setUpVector = function(a) {
  if (a) {
    this.UpVector = a.clone();
  }
};
CL3D.CameraSceneNode.prototype.getNearValue = function() {
  return this.ZNear;
};
CL3D.CameraSceneNode.prototype.setNearValue = function(a) {
  if (!CL3D.equals(this.ZNear, a)) {
    this.ZNear = a;
    this.recalculateProjectionMatrix();
  }
};
CL3D.CameraSceneNode.prototype.getFarValue = function() {
  return this.ZFar;
};
CL3D.CameraSceneNode.prototype.setFarValue = function(a) {
  if (!CL3D.equals(this.ZFar, a)) {
    this.ZFar = a;
    this.recalculateProjectionMatrix();
  }
};
CL3D.CameraSceneNode.prototype.recalculateViewArea = function() {
};
CL3D.CameraSceneNode.prototype.OnAnimate = function(b, c) {
  var a = CL3D.SceneNode.prototype.OnAnimate.call(this, b, c);
  this.calculateViewMatrix();
  return a;
};
CL3D.CameraSceneNode.prototype.calculateViewMatrix = function() {
  var b = this.getAbsolutePosition();
  var a = this.Target.clone();
  if (b.equals(a)) {
    a.X += 1;
  }
  this.ViewMatrix.buildCameraLookAtMatrixLH(b, a, this.UpVector);
  this.recalculateViewArea();
};
CL3D.CameraSceneNode.prototype.OnRegisterSceneNode = function(a) {
  if (a.getActiveCamera() === this) {
    a.registerNodeForRendering(this, 2);
    CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, a);
  }
};
CL3D.CameraSceneNode.prototype.render = function(a) {
  this.calculateViewMatrix();
  if (this.Aspect == 0) {
    this.setAutoAspectIfNoFixedSet(a.width, a.height);
    if (this.Aspect == 0) {
      this.setAspectRatio(3 / 4);
    }
  }
  a.setProjection(this.Projection);
  a.setView(this.ViewMatrix);
};
CL3D.CameraSceneNode.prototype.onMouseDown = function(b) {
  for (var a = 0;a < this.Animators.length;++a) {
    this.Animators[a].onMouseDown(b);
  }
};
CL3D.CameraSceneNode.prototype.onMouseWheel = function(b) {
  for (var a = 0;a < this.Animators.length;++a) {
    this.Animators[a].onMouseWheel(b);
  }
};
CL3D.CameraSceneNode.prototype.onMouseUp = function(b) {
  for (var a = 0;a < this.Animators.length;++a) {
    this.Animators[a].onMouseUp(b);
  }
};
CL3D.CameraSceneNode.prototype.onMouseMove = function(b) {
  for (var a = 0;a < this.Animators.length;++a) {
    this.Animators[a].onMouseMove(b);
  }
};
CL3D.CameraSceneNode.prototype.onKeyDown = function(c) {
  var a = false;
  for (var b = 0;b < this.Animators.length;++b) {
    if (this.Animators[b].onKeyDown(c)) {
      a = true;
    }
  }
  return a;
};
CL3D.CameraSceneNode.prototype.onKeyUp = function(c) {
  var a = false;
  for (var b = 0;b < this.Animators.length;++b) {
    if (this.Animators[b].onKeyUp(c)) {
      a = true;
    }
  }
  return a;
};
CL3D.CameraSceneNode.prototype.createClone = function(b, a, e) {
  var d = new CL3D.CameraSceneNode;
  this.cloneMembers(d, b, a, e);
  if (this.Target) {
    d.Target = this.Target.clone();
  }
  if (this.UpVector) {
    d.UpVector = this.UpVector.clone();
  }
  if (this.Projection) {
    d.Projection = this.Projection.clone();
  }
  if (this.ViewMatrix) {
    d.ViewMatrix = this.ViewMatrix.clone();
  }
  d.Fovy = this.Fovy;
  d.Aspect = this.Aspect;
  d.ZNear = this.ZNear;
  d.ZFar = this.ZFar;
  if (this.Box) {
    d.Box = this.Box.clone();
  }
  return d;
};
CL3D.CameraSceneNode.prototype.setAutoAspectIfNoFixedSet = function(a, d) {
  if (a == 0 || d == 0) {
    return;
  }
  var c = this.Aspect;
  if (!CL3D.equals(c, 0)) {
    return;
  }
  var b = a / d;
  this.setAspectRatio(b);
};
CL3D.MeshSceneNode = function() {
  this.init();
  this.Box = new CL3D.Box3d;
  this.DoesCollision = false;
  this.OwnedMesh = null;
  this.ReadOnlyMaterials = true;
  this.Selector = null;
};
CL3D.MeshSceneNode.prototype = new CL3D.SceneNode;
CL3D.MeshSceneNode.prototype.getBoundingBox = function() {
  if (this.OwnedMesh) {
    return this.OwnedMesh.Box;
  }
  return this.Box;
};
CL3D.MeshSceneNode.prototype.getMesh = function() {
  return this.OwnedMesh;
};
CL3D.MeshSceneNode.prototype.setMesh = function(a) {
  this.OwnedMesh = a;
};
CL3D.MeshSceneNode.prototype.getType = function() {
  return "mesh";
};
CL3D.MeshSceneNode.prototype.OnRegisterSceneNode = function(d) {
  var f = this.OwnedMesh;
  if (this.Visible && f) {
    var e = false;
    var a = false;
    for (var c = 0;c < f.MeshBuffers.length;++c) {
      var b = f.MeshBuffers[c];
      if (b.Mat.isTransparent()) {
        e = true;
      } else {
        a = true;
      }
    }
    if (e) {
      d.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_TRANSPARENT);
    }
    if (a) {
      d.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
    }
    CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, d);
  }
};
CL3D.MeshSceneNode.prototype.render = function(a) {
  a.setWorld(this.AbsoluteTransformation);
  a.drawMesh(this.OwnedMesh);
};
CL3D.MeshSceneNode.prototype.getMaterialCount = function() {
  if (this.OwnedMesh) {
    return this.OwnedMesh.MeshBuffers.length;
  }
  return 0;
};
CL3D.MeshSceneNode.prototype.getMaterial = function(b) {
  if (this.OwnedMesh != null) {
    if (b >= 0 && b < this.OwnedMesh.MeshBuffers.length) {
      var a = this.OwnedMesh.MeshBuffers[b];
      return a.Mat;
    }
  }
  return null;
};
CL3D.MeshSceneNode.prototype.createClone = function(b, a, e) {
  var d = new CL3D.MeshSceneNode;
  this.cloneMembers(d, b, a, e);
  if (this.OwnedMesh) {
    d.OwnedMesh = this.OwnedMesh.createClone();
  }
  d.ReadonlyMaterials = this.ReadonlyMaterials;
  d.DoesCollision = this.DoesCollision;
  if (this.Box) {
    d.Box = this.Box.clone();
  }
  return d;
};
CL3D.SkyBoxSceneNode = function() {
  this.OwnedMesh = new CL3D.Mesh;
  var a = [0, 1, 2, 0, 2, 3];
  var b = new CL3D.MeshBuffer;
  this.OwnedMesh.AddMeshBuffer(b);
  b.Mat.ClampTexture1 = true;
  b.Indices = a;
  b.Vertices.push(this.createVertex(-1, -1, -1, 0, 0, 1, 1, 1));
  b.Vertices.push(this.createVertex(1, -1, -1, 0, 0, 1, 0, 1));
  b.Vertices.push(this.createVertex(1, 1, -1, 0, 0, 1, 0, 0));
  b.Vertices.push(this.createVertex(-1, 1, -1, 0, 0, 1, 1, 0));
  b = new CL3D.MeshBuffer;
  this.OwnedMesh.AddMeshBuffer(b);
  b.Mat.ClampTexture1 = true;
  b.Indices = a;
  b.Vertices.push(this.createVertex(1, -1, -1, -1, 0, 0, 1, 1));
  b.Vertices.push(this.createVertex(1, -1, 1, -1, 0, 0, 0, 1));
  b.Vertices.push(this.createVertex(1, 1, 1, -1, 0, 0, 0, 0));
  b.Vertices.push(this.createVertex(1, 1, -1, -1, 0, 0, 1, 0));
  b = new CL3D.MeshBuffer;
  this.OwnedMesh.AddMeshBuffer(b);
  b.Mat.ClampTexture1 = true;
  b.Indices = a;
  b.Vertices.push(this.createVertex(-1, -1, 1, 1, 0, 0, 1, 1));
  b.Vertices.push(this.createVertex(-1, -1, -1, 1, 0, 0, 0, 1));
  b.Vertices.push(this.createVertex(-1, 1, -1, 1, 0, 0, 0, 0));
  b.Vertices.push(this.createVertex(-1, 1, 1, 1, 0, 0, 1, 0));
  b = new CL3D.MeshBuffer;
  this.OwnedMesh.AddMeshBuffer(b);
  b.Mat.ClampTexture1 = true;
  b.Indices = a;
  b.Vertices.push(this.createVertex(1, -1, 1, 0, 0, -1, 1, 1));
  b.Vertices.push(this.createVertex(-1, -1, 1, 0, 0, -1, 0, 1));
  b.Vertices.push(this.createVertex(-1, 1, 1, 0, 0, -1, 0, 0));
  b.Vertices.push(this.createVertex(1, 1, 1, 0, 0, -1, 1, 0));
  b = new CL3D.MeshBuffer;
  this.OwnedMesh.AddMeshBuffer(b);
  b.Mat.ClampTexture1 = true;
  b.Indices = a;
  b.Vertices.push(this.createVertex(1, 1, -1, 0, -1, 0, 1, 1));
  b.Vertices.push(this.createVertex(1, 1, 1, 0, -1, 0, 0, 1));
  b.Vertices.push(this.createVertex(-1, 1, 1, 0, -1, 0, 0, 0));
  b.Vertices.push(this.createVertex(-1, 1, -1, 0, -1, 0, 1, 0));
  b = new CL3D.MeshBuffer;
  this.OwnedMesh.AddMeshBuffer(b);
  b.Mat.ClampTexture1 = true;
  b.Indices = a;
  b.Vertices.push(this.createVertex(1, -1, 1, 0, 1, 0, 1, 1));
  b.Vertices.push(this.createVertex(1, -1, -1, 0, 1, 0, 0, 1));
  b.Vertices.push(this.createVertex(-1, -1, -1, 0, 1, 0, 0, 0));
  b.Vertices.push(this.createVertex(-1, -1, 1, 0, 1, 0, 1, 0));
};
CL3D.SkyBoxSceneNode.prototype = new CL3D.MeshSceneNode;
CL3D.SkyBoxSceneNode.prototype.getType = function() {
  return "sky";
};
CL3D.SkyBoxSceneNode.prototype.createVertex = function(g, f, e, d, c, b, i, h) {
  var a = new CL3D.Vertex3D(true);
  a.Pos.X = g;
  a.Pos.Y = f;
  a.Pos.Z = e;
  a.TCoords.X = i;
  a.TCoords.Y = h;
  return a;
};
CL3D.SkyBoxSceneNode.prototype.OnRegisterSceneNode = function(a) {
  if (this.Visible) {
    a.registerNodeForRendering(this, 1);
    CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, a);
  }
};
CL3D.SkyBoxSceneNode.prototype.render = function(b) {
  var a = this.scene.getActiveCamera();
  if (!a || !this.OwnedMesh) {
    return;
  }
  var d = new CL3D.Matrix4(false);
  this.AbsoluteTransformation.copyTo(d);
  d.setTranslation(a.getAbsolutePosition());
  var e = (a.getNearValue() + a.getFarValue()) * 0.5;
  var c = new CL3D.Matrix4;
  c.setScale(new CL3D.Vect3d(e, e, e));
  b.setWorld(d.multiply(c));
  b.drawMesh(this.OwnedMesh);
};
CL3D.SkyBoxSceneNode.prototype.createClone = function(b, a, e) {
  var d = new CL3D.SkyBoxSceneNode;
  this.cloneMembers(d, b, a, e);
  if (this.OwnedMesh) {
    d.OwnedMesh = this.OwnedMesh.clone();
  }
  d.ReadonlyMaterials = this.ReadonlyMaterials;
  d.DoesCollision = this.DoesCollision;
  if (this.Box) {
    d.Box = this.Box.clone();
  }
  return d;
};
CL3D.CubeSceneNode = function(e) {
  if (e == null) {
    e = 10;
  }
  this.OwnedMesh = new CL3D.Mesh;
  var c = new CL3D.MeshBuffer;
  c.Indices = [0, 2, 1, 0, 3, 2, 1, 5, 4, 1, 2, 5, 4, 6, 7, 4, 5, 6, 7, 3, 0, 7, 6, 3, 9, 5, 2, 9, 8, 5, 0, 11, 10, 0, 10, 7];
  this.OwnedMesh.AddMeshBuffer(c);
  var b = CL3D.createColor(255, 255, 255, 255);
  c.Vertices.push(this.createVertex(0, 0, 0, -1, -1, -1, b, 0, 1));
  c.Vertices.push(this.createVertex(1, 0, 0, 1, -1, -1, b, 1, 1));
  c.Vertices.push(this.createVertex(1, 1, 0, 1, 1, -1, b, 1, 0));
  c.Vertices.push(this.createVertex(0, 1, 0, -1, 1, -1, b, 0, 0));
  c.Vertices.push(this.createVertex(1, 0, 1, 1, -1, 1, b, 0, 1));
  c.Vertices.push(this.createVertex(1, 1, 1, 1, 1, 1, b, 0, 0));
  c.Vertices.push(this.createVertex(0, 1, 1, -1, 1, 1, b, 1, 0));
  c.Vertices.push(this.createVertex(0, 0, 1, -1, -1, 1, b, 1, 1));
  c.Vertices.push(this.createVertex(0, 1, 1, -1, 1, 1, b, 0, 1));
  c.Vertices.push(this.createVertex(0, 1, 0, -1, 1, -1, b, 1, 1));
  c.Vertices.push(this.createVertex(1, 0, 1, 1, -1, 1, b, 1, 0));
  c.Vertices.push(this.createVertex(1, 0, 0, 1, -1, -1, b, 0, 0));
  for (var d = 0;d < 12;++d) {
    var a = c.Vertices[d].Pos;
    a.multiplyThisWithScal(e);
    a.X -= e * 0.5;
    a.Y -= e * 0.5;
    a.Z -= e * 0.5;
  }
  c.recalculateBoundingBox();
  this.OwnedMesh.Box = c.Box.clone();
  this.init();
};
CL3D.CubeSceneNode.prototype = new CL3D.MeshSceneNode;
CL3D.CubeSceneNode.prototype.createVertex = function(g, f, e, d, c, b, j, i, h) {
  var a = new CL3D.Vertex3D(true);
  a.Pos.X = g;
  a.Pos.Y = f;
  a.Pos.Z = e;
  a.Normal.X = d;
  a.Normal.Y = c;
  a.Normal.Z = b;
  a.TCoords.X = i;
  a.TCoords.Y = h;
  return a;
};
CL3D.CubeSceneNode.prototype.createClone = function(b, a, e) {
  var d = new CL3D.CubeSceneNode;
  this.cloneMembers(d, b, a, e);
  d.OwnedMesh = this.OwnedMesh;
  d.ReadonlyMaterials = this.ReadonlyMaterials;
  d.DoesCollision = this.DoesCollision;
  if (this.Box) {
    d.Box = this.Box.clone();
  }
  return d;
};
CL3D.BillboardSceneNode = function() {
  this.init();
  this.Box = new CL3D.Box3d;
  this.SizeX = 10;
  this.SizeY = 10;
  this.IsVertical = false;
  this.MeshBuffer = new CL3D.MeshBuffer;
  this.vtx1 = new CL3D.Vertex3D(true);
  this.vtx2 = new CL3D.Vertex3D(true);
  this.vtx3 = new CL3D.Vertex3D(true);
  this.vtx4 = new CL3D.Vertex3D(true);
  var c = this.MeshBuffer.Indices;
  c.push(0);
  c.push(2);
  c.push(1);
  c.push(0);
  c.push(3);
  c.push(2);
  var a = this.MeshBuffer.Vertices;
  a.push(this.vtx1);
  a.push(this.vtx2);
  a.push(this.vtx3);
  a.push(this.vtx4);
  this.vtx1.TCoords.X = 1;
  this.vtx1.TCoords.Y = 1;
  this.vtx2.TCoords.X = 1;
  this.vtx2.TCoords.Y = 0;
  this.vtx3.TCoords.X = 0;
  this.vtx3.TCoords.Y = 0;
  this.vtx4.TCoords.X = 0;
  this.vtx4.TCoords.Y = 1;
  for (var b = 0;b < 4;++b) {
    this.Box.addInternalPointByVector(a[b].Pos);
  }
};
CL3D.BillboardSceneNode.prototype = new CL3D.SceneNode;
CL3D.BillboardSceneNode.prototype.getBoundingBox = function() {
  return this.Box;
};
CL3D.BillboardSceneNode.prototype.getType = function() {
  return "billboard";
};
CL3D.BillboardSceneNode.prototype.OnRegisterSceneNode = function(a) {
  if (this.Visible) {
    a.registerNodeForRendering(this, this.MeshBuffer.Mat.isTransparent() ? CL3D.Scene.RENDER_MODE_TRANSPARENT : CL3D.Scene.RENDER_MODE_DEFAULT);
    CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, a);
  }
};
CL3D.BillboardSceneNode.prototype.render = function(k) {
  var a = this.scene.getActiveCamera();
  if (!a) {
    return;
  }
  var e = this.IsVertical;
  if (!e) {
    var m = this.getAbsolutePosition();
    var n = k.getStaticBillboardMeshBuffer();
    var g = new CL3D.Matrix4(true);
    g.setScale(new CL3D.Vect3d(this.SizeX * 0.5, this.SizeY * 0.5, 0));
    var i = k.getView().clone();
    i.setTranslation(new CL3D.Vect3d(0, 0, 0));
    var o = new CL3D.Matrix4(true);
    i.getInverse(o);
    o.setTranslation(m);
    g = o.multiply(g);
    k.setWorld(g);
    k.setMaterial(this.MeshBuffer.Mat);
    k.drawMeshBuffer(n);
  } else {
    var m = this.getAbsolutePosition();
    var c = a.getAbsolutePosition();
    var h = a.getTarget();
    var f = a.getUpVector();
    var l = h.substract(c);
    l.normalize();
    var b = f.crossProduct(l);
    if (b.getLengthSQ() == 0) {
      b.set(f.Y, f.X, f.Z);
    }
    b.normalize();
    b.multiplyThisWithScal(0.5 * this.SizeX);
    var d = b.crossProduct(l);
    d.normalize();
    d.multiplyThisWithScal(0.5 * this.SizeY);
    if (this.IsVertical) {
      d.set(0, -0.5 * this.SizeY, 0);
    }
    l.multiplyThisWithScal(1);
    this.vtx1.Pos.setTo(m);
    this.vtx1.Pos.addToThis(b);
    this.vtx1.Pos.addToThis(d);
    this.vtx2.Pos.setTo(m);
    this.vtx2.Pos.addToThis(b);
    this.vtx2.Pos.substractFromThis(d);
    this.vtx3.Pos.setTo(m);
    this.vtx3.Pos.substractFromThis(b);
    this.vtx3.Pos.substractFromThis(d);
    this.vtx4.Pos.setTo(m);
    this.vtx4.Pos.substractFromThis(b);
    this.vtx4.Pos.addToThis(d);
    this.MeshBuffer.update(true);
    var j = new CL3D.Matrix4(true);
    k.setWorld(j);
    k.setMaterial(this.MeshBuffer.Mat);
    k.drawMeshBuffer(this.MeshBuffer);
  }
};
CL3D.BillboardSceneNode.prototype.getMaterialCount = function() {
  return 1;
};
CL3D.BillboardSceneNode.prototype.getMaterial = function(a) {
  return this.MeshBuffer.Mat;
};
CL3D.BillboardSceneNode.prototype.createClone = function(b, a, e) {
  var d = new CL3D.BillboardSceneNode;
  this.cloneMembers(d, b, a, e);
  if (this.Box) {
    d.Box = this.Box.clone();
  }
  d.SizeX = this.SizeX;
  d.SizeY = this.SizeY;
  d.IsVertical = this.IsVertical;
  d.MeshBuffer.Mat = this.MeshBuffer.Mat.clone();
  return d;
};
CL3D.BillboardSceneNode.prototype.getSize = function() {
  return new CL3D.Vect2d(this.SizeX, this.SizeY);
};
CL3D.BillboardSceneNode.prototype.setSize = function(a, b) {
  this.SizeX = a;
  this.SizeY = b;
};
CL3D.ParticleSystemSceneNode = function() {
  this.init();
  this.Box = new CL3D.Box3d;
  this.Buffer = new CL3D.MeshBuffer;
  this.Direction = new CL3D.Vect3d(0, -0.03, 0);
  this.EmittArea = new CL3D.Vect3d(0, 0, 0);
  this.LastEmitTime = 0;
  this.TimeSinceLastEmitting = 0;
  this.Particles = new Array;
};
CL3D.ParticleSystemSceneNode.prototype = new CL3D.SceneNode;
CL3D.ParticleSystemSceneNode.prototype.Direction = null;
CL3D.ParticleSystemSceneNode.prototype.MaxAngleDegrees = 10;
CL3D.ParticleSystemSceneNode.prototype.EmittArea = null;
CL3D.ParticleSystemSceneNode.prototype.MinLifeTime = 1E3;
CL3D.ParticleSystemSceneNode.prototype.MaxLifeTime = 2E3;
CL3D.ParticleSystemSceneNode.prototype.MaxParticles = 200;
CL3D.ParticleSystemSceneNode.prototype.MinParticlesPerSecond = 10;
CL3D.ParticleSystemSceneNode.prototype.MaxParticlesPerSecond = 20;
CL3D.ParticleSystemSceneNode.prototype.MinStartColor = 4278190080;
CL3D.ParticleSystemSceneNode.prototype.MaxStartColor = 4294967295;
CL3D.ParticleSystemSceneNode.prototype.MinStartSizeX = 5;
CL3D.ParticleSystemSceneNode.prototype.MinStartSizeY = 5;
CL3D.ParticleSystemSceneNode.prototype.MaxStartSizeX = 7;
CL3D.ParticleSystemSceneNode.prototype.MaxStartSizeY = 7;
CL3D.ParticleSystemSceneNode.prototype.FadeOutAffector = false;
CL3D.ParticleSystemSceneNode.prototype.FadeOutTime = 500;
CL3D.ParticleSystemSceneNode.prototype.FadeOutTime = 0;
CL3D.ParticleSystemSceneNode.prototype.GravityAffector = false;
CL3D.ParticleSystemSceneNode.prototype.GravityAffectingTime = 500;
CL3D.ParticleSystemSceneNode.prototype.Gravity = null;
CL3D.ParticleSystemSceneNode.prototype.ScaleAffector = false;
CL3D.ParticleSystemSceneNode.prototype.ScaleToX = 20;
CL3D.ParticleSystemSceneNode.prototype.ScaleToY = 20;
CL3D.ParticleSystemSceneNode.prototype.createClone = function(b, a, e) {
  var d = new CL3D.ParticleSystemSceneNode;
  this.cloneMembers(d, b, a, e);
  if (this.Box) {
    d.Box = this.Box.clone();
  }
  d.Direction = this.Direction.clone();
  d.MaxAngleDegrees = this.MaxAngleDegrees;
  d.EmittArea = this.EmittArea.clone();
  d.MinLifeTime = this.MinLifeTime;
  d.MaxLifeTime = this.MaxLifeTime;
  d.MaxParticles = this.MaxParticles;
  d.MinParticlesPerSecond = this.MinParticlesPerSecond;
  d.MaxParticlesPerSecond = this.MaxParticlesPerSecond;
  d.MinStartColor = this.MinStartColor;
  d.MaxStartColor = this.MaxStartColor;
  d.MinStartSizeX = this.MinStartSizeX;
  d.MinStartSizeY = this.MinStartSizeY;
  d.MaxStartSizeX = this.MaxStartSizeX;
  d.MaxStartSizeY = this.MaxStartSizeY;
  d.FadeOutAffector = true;
  d.FadeOutTime = this.FadeOutTime;
  d.FadeTargetColor = this.FadeTargetColor;
  d.GravityAffector = this.GravityAffector;
  d.GravityAffectingTime = this.GravityAffectingTime;
  d.Gravity = this.Gravity;
  d.ScaleAffector = this.ScaleAffector;
  d.ScaleToX = this.ScaleToX;
  d.ScaleToY = this.ScaleToY;
  d.Buffer.Mat = this.Buffer.Mat.clone();
  return d;
};
CL3D.ParticleSystemSceneNode.prototype.getBoundingBox = function() {
  return this.Box;
};
CL3D.ParticleSystemSceneNode.prototype.getType = function() {
  return "particlesystem";
};
CL3D.ParticleSystemSceneNode.prototype.OnRegisterSceneNode = function(a) {
  if (this.Visible) {
    a.registerNodeForRendering(this, this.Buffer.Mat.isTransparent() ? CL3D.Scene.RENDER_MODE_TRANSPARENT : CL3D.Scene.RENDER_MODE_DEFAULT);
    CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, a);
  }
};
CL3D.ParticleSystemSceneNode.prototype.render = function(b) {
  var a = this.scene.getActiveCamera();
  if (!a) {
    return;
  }
};
CL3D.ParticleSystemSceneNode.prototype.getMaterialCount = function() {
  return 1;
};
CL3D.ParticleSystemSceneNode.prototype.getMaterial = function(a) {
  return this.Buffer.Mat;
};
CL3D.ParticleSystemSceneNode.prototype.OnAnimate = function(b, c) {
  var a = false;
  if (this.Visible) {
    a = this.doParticleSystem(c);
  }
  return CL3D.SceneNode.prototype.OnAnimate.call(this, b, c) || a;
};
CL3D.ParticleSystemSceneNode.prototype.OnRegisterSceneNode = function(a) {
  if (this.Visible) {
    if (this.Particles.length != 0) {
      a.registerNodeForRendering(this, this.Buffer.Mat.isTransparent() ? CL3D.Scene.RENDER_MODE_TRANSPARENT : CL3D.Scene.RENDER_MODE_DEFAULT);
    }
    CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, a);
  }
};
CL3D.ParticleSystemSceneNode.prototype.render = function(j) {
  var a = this.scene.getActiveCamera();
  if (!a) {
    return;
  }
  if (this.Particles.length == 0) {
    return;
  }
  this.reallocateBuffers();
  var c = j.getView();
  var k = new CL3D.Vect3d(-c.m02, -c.m06, -c.m10);
  var l = 0;
  var n = null;
  for (var e = 0;e < this.Particles.length;++e) {
    var h = this.Particles[e];
    var g = 0.5 * h.sizeX;
    var b = new CL3D.Vect3d(c.m00 * g, c.m04 * g, c.m08 * g);
    g = -0.5 * h.sizeY;
    var d = new CL3D.Vect3d(c.m01 * g, c.m05 * g, c.m09 * g);
    n = this.Buffer.Vertices[0 + l];
    n.Pos = h.pos.add(b).add(d);
    n.Color = h.color;
    n.Normal = k;
    n = this.Buffer.Vertices[1 + l];
    n.Pos = h.pos.add(b).substract(d);
    n.Color = h.color;
    n.Normal = k;
    n = this.Buffer.Vertices[2 + l];
    n.Pos = h.pos.substract(b).substract(d);
    n.Color = h.color;
    n.Normal = k;
    n = this.Buffer.Vertices[3 + l];
    n.Pos = h.pos.substract(b).add(d);
    n.Color = h.color;
    n.Normal = k;
    l += 4;
  }
  var o = new CL3D.Matrix4(true);
  j.setWorld(o);
  this.Buffer.update(false, true);
  j.setMaterial(this.Buffer.Mat);
  j.drawMeshBuffer(this.Buffer, this.Particles.length * 2 * 3);
};
CL3D.ParticleSystemSceneNode.prototype.doParticleSystem = function(d) {
  if (this.LastEmitTime == 0) {
    this.LastEmitTime = d;
    return false;
  }
  var b = d;
  var j = d - this.LastEmitTime;
  this.LastEmitTime = d;
  if (!this.Visible) {
    return false;
  }
  var f = false;
  f = this.emit(d, j);
  f = this.affect(d, j) || f;
  var k = this.AbsoluteTransformation.getTranslation();
  this.Buffer.Box.reset(k.X, k.Y, k.Z);
  var e = j;
  if (this.Particles.length != 0) {
    f = true;
  }
  for (var g = 0;g < this.Particles.length;) {
    var a = this.Particles[g];
    if (b > a.endTime) {
      this.Particles.splice(g, 1);
    } else {
      a.pos.addToThis(a.vector.multiplyWithScal(e));
      this.Buffer.Box.addInternalPointByVector(a.pos);
      ++g;
    }
  }
  var c = this.MaxStartSizeX * 0.5;
  this.Buffer.Box.MaxEdge.X += c;
  this.Buffer.Box.MaxEdge.Y += c;
  this.Buffer.Box.MaxEdge.Z += c;
  this.Buffer.Box.MinEdge.X -= c;
  this.Buffer.Box.MinEdge.Y -= c;
  this.Buffer.Box.MinEdge.Z -= c;
  var h = new CL3D.Matrix4(false);
  this.AbsoluteTransformation.getInverse(h);
  h.transformBoxEx(this.Buffer.Box);
  return f;
};
CL3D.ParticleSystemSceneNode.prototype.emit = function(b, r) {
  var g = this.MaxParticlesPerSecond - this.MinParticlesPerSecond;
  var e = g ? this.MinParticlesPerSecond + Math.random() * g : this.MinParticlesPerSecond;
  var d = 1E3 / e;
  var o = this.Particles.length;
  this.TimeSinceLastEmitting += r;
  if (this.TimeSinceLastEmitting <= d) {
    return false;
  }
  var l = this.TimeSinceLastEmitting / d + 0.5;
  this.TimeSinceLastEmitting = 0;
  if (o + l > this.MaxParticles) {
    var t = o + l - this.MaxParticles;
    l -= t;
  }
  if (l <= 0) {
    return false;
  }
  var k = this.Direction.clone();
  this.AbsoluteTransformation.rotateVect(k);
  var q = this.AbsoluteTransformation.getScale().X;
  var n = this.EmittArea.equalsZero();
  for (var j = o;j < o + l;++j) {
    var a = new CL3D.Particle;
    a.pos = new CL3D.Vect3d(0, 0, 0);
    if (!n) {
      if (this.EmittArea.X != 0) {
        a.pos.X = Math.random() * this.EmittArea.X - this.EmittArea.X * 0.5;
      }
      if (this.EmittArea.Y != 0) {
        a.pos.Y = Math.random() * this.EmittArea.Y - this.EmittArea.Y * 0.5;
      }
      if (this.EmittArea.Z != 0) {
        a.pos.Z = Math.random() * this.EmittArea.Z - this.EmittArea.Z * 0.5;
      }
    }
    a.startTime = b;
    a.vector = k.clone();
    if (this.MaxAngleDegrees) {
      var c = k.clone();
      c.rotateXYBy(Math.random() * this.MaxAngleDegrees * 2 - this.MaxAngleDegrees);
      c.rotateYZBy(Math.random() * this.MaxAngleDegrees * 2 - this.MaxAngleDegrees);
      c.rotateXZBy(Math.random() * this.MaxAngleDegrees * 2 - this.MaxAngleDegrees);
      a.vector = c;
    }
    if (this.MaxLifeTime - this.MinLifeTime == 0) {
      a.endTime = b + this.MinLifeTime;
    } else {
      a.endTime = b + this.MinLifeTime + Math.random() * (this.MaxLifeTime - this.MinLifeTime);
    }
    a.color = CL3D.getInterpolatedColor(this.MinStartColor, this.MaxStartColor, Math.random() * 100 / 100);
    a.startColor = a.color;
    a.startVector = a.vector.clone();
    if (this.MinStartSizeX == this.MaxStartSizeX && this.MinStartSizeY == this.MaxStartSizeY) {
      a.startSizeX = this.MinStartSizeX;
      a.startSizeY = this.MinStartSizeY;
    } else {
      var m = Math.random() * 100 / 100;
      var h = 1 - m;
      a.startSizeX = this.MinStartSizeX * m + this.MaxStartSizeX * h;
      a.startSizeY = this.MinStartSizeY * m + this.MaxStartSizeY * h;
    }
    a.startSizeX *= q;
    a.startSizeY *= q;
    a.sizeX = a.startSizeX;
    a.sizeY = a.startSizeY;
    this.AbsoluteTransformation.transformVect(a.pos);
    this.Particles.unshift(a);
  }
  return true;
};
CL3D.ParticleSystemSceneNode.prototype.affect = function(b, m) {
  if (!this.FadeOutAffector && (!this.GravityAffector && !this.ScaleAffector)) {
    return false;
  }
  var e = 0;
  var a = null;
  if (this.FadeOutAffector) {
    for (e = 0;e < this.Particles.length;++e) {
      a = this.Particles[e];
      if (a.endTime - b < this.FadeOutTime) {
        var j = (a.endTime - b) / this.FadeOutTime;
        a.color = CL3D.getInterpolatedColor(a.startColor, this.FadeTargetColor, j);
      }
    }
  }
  if (this.GravityAffector) {
    var h = this.Gravity.multiplyWithVect(this.AbsoluteTransformation.getScale());
    for (e = 0;e < this.Particles.length;++e) {
      a = this.Particles[e];
      var n = (b - a.startTime) / this.GravityAffectingTime;
      n = CL3D.clamp(n, 0, 1);
      n = 1 - n;
      a.vector = a.startVector.getInterpolated(h, n);
    }
  }
  if (this.ScaleAffector) {
    var k = this.AbsoluteTransformation.getScale().X;
    for (e = 0;e < this.Particles.length;++e) {
      a = this.Particles[e];
      var c = a.endTime - a.startTime;
      var f = b - a.startTime;
      var l = f / c;
      a.sizeX = a.startSizeX + this.ScaleToX * l * k;
      a.sizeY = a.startSizeY + this.ScaleToY * l * k;
    }
  }
  return true;
};
CL3D.ParticleSystemSceneNode.prototype.reallocateBuffers = function() {
  if (this.Particles.length * 4 > this.Buffer.Vertices.length || this.Particles.length * 6 > this.Buffer.Indices.length) {
    var g = this.Buffer.Vertices.length;
    var f = this.Buffer.Vertices;
    while (this.Buffer.Vertices.length < this.Particles.length * 4) {
      var b = null;
      b = new CL3D.Vertex3D(true);
      b.TCoords.set(0, 0);
      f.push(b);
      b = new CL3D.Vertex3D(true);
      b.TCoords.set(0, 1);
      f.push(b);
      b = new CL3D.Vertex3D(true);
      b.TCoords.set(1, 1);
      f.push(b);
      b = new CL3D.Vertex3D(true);
      b.TCoords.set(1, 0);
      f.push(b);
    }
    var e = this.Buffer.Indices.length;
    var h = g;
    var d = this.Particles.length * 6;
    var a = this.Buffer.Indices;
    for (var c = e;c < d;c += 6) {
      a.push(0 + h);
      a.push(2 + h);
      a.push(1 + h);
      a.push(0 + h);
      a.push(3 + h);
      a.push(2 + h);
      h += 4;
    }
  }
};
CL3D.Particle = function(a) {
  this.pos = null;
  this.vector = null;
  this.startTime = 0;
  this.endTime = 0;
  this.color = 0;
  this.startColor = 0;
  this.startVector = null;
  this.sizeX = 0;
  this.sizeY = 0;
  this.startSizeX = 0;
  this.startSizeY = 0;
};
CL3D.Light = function() {
  this.Position = new CL3D.Vect3d(0, 0, 0);
  this.Color = new CL3D.ColorF;
  this.Radius = 100;
  this.Attenuation = 1 / 100;
};
CL3D.Light.prototype.clone = function() {
  var a = new CL3D.Light;
  a.Position = this.Position.clone();
  a.Color = this.Color.clone();
  a.Radius = this.Radius;
  a.Attenuation = this.Attenuation;
  return a;
};
CL3D.Light.prototype.Position = null;
CL3D.Light.prototype.Color = null;
CL3D.Light.prototype.Attenuation = null;
CL3D.Light.prototype.Radius = null;
CL3D.LightSceneNode = function(a) {
  this.LightData = new CL3D.Light;
  this.Box = new CL3D.Box3d;
  this.init();
};
CL3D.LightSceneNode.prototype = new CL3D.SceneNode;
CL3D.LightSceneNode.prototype.getType = function() {
  return "light";
};
CL3D.LightSceneNode.prototype.LightData = null;
CL3D.LightSceneNode.prototype.createClone = function(b, a, e) {
  var d = new CL3D.LightSceneNode;
  this.cloneMembers(d, b, a, e);
  d.LightData = this.LightData.clone();
  d.Box = this.Box.clone();
  return d;
};
CL3D.LightSceneNode.prototype.OnRegisterSceneNode = function(a) {
  if (this.Visible) {
    a.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_LIGHTS);
  }
  CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, a);
  this.LightData.Position = this.getAbsolutePosition();
};
CL3D.LightSceneNode.prototype.getBoundingBox = function() {
  return this.Box;
};
CL3D.LightSceneNode.prototype.render = function(a) {
  a.addDynamicLight(this.LightData);
};
CL3D.PathSceneNode = function() {
  this.init();
  this.Box = new CL3D.Box3d;
  this.Tightness = 0;
  this.IsClosedCircle = false;
  this.Nodes = new Array;
};
CL3D.PathSceneNode.prototype = new CL3D.SceneNode;
CL3D.PathSceneNode.prototype.Tightness = 0;
CL3D.PathSceneNode.prototype.IsClosedCircle = false;
CL3D.PathSceneNode.prototype.Nodes = new Array;
CL3D.PathSceneNode.prototype.getBoundingBox = function() {
  return this.Box;
};
CL3D.PathSceneNode.prototype.getType = function() {
  return "path";
};
CL3D.PathSceneNode.prototype.createClone = function(d, b, g) {
  var f = new CL3D.PathSceneNode;
  this.cloneMembers(f, d, b, g);
  if (this.Box) {
    f.Box = this.Box.clone();
  }
  f.Tightness = this.Tightness;
  f.IsClosedCircle = this.IsClosedCircle;
  f.Nodes = new Array;
  for (var a = 0;a < this.Nodes.length;++a) {
    var e = this.Nodes[a];
    f.Nodes.push(e.clone());
  }
  return f;
};
CL3D.PathSceneNode.prototype.getPathNodeCount = function() {
  return this.Nodes.length;
};
CL3D.PathSceneNode.prototype.getPathNodePosition = function(a) {
  if (a < 0 || a >= this.Nodes.length) {
    return new CL3D.Vect3d(0, 0, 0);
  }
  if (!this.AbsoluteTransformation) {
    this.updateAbsolutePosition();
  }
  var b = this.Nodes[a];
  b = b.clone();
  this.AbsoluteTransformation.transformVect(b);
  return b;
};
CL3D.PathSceneNode.prototype.clampPathIndex = function(a, b) {
  if (this.IsClosedCircle) {
    return a < 0 ? b + a : a >= b ? a - b : a;
  }
  return a < 0 ? 0 : a >= b ? b - 1 : a;
};
CL3D.PathSceneNode.prototype.getPointOnPath = function(p, a) {
  var h = this.Nodes.length;
  if (this.IsClosedCircle) {
    p *= h;
  } else {
    p = CL3D.clamp(p, 0, 1);
    p *= h - 1;
  }
  var e = new CL3D.Vect3d;
  if (h == 0) {
    return e;
  }
  if (h == 1) {
    return e;
  }
  var b = p;
  var o = CL3D.fract(b);
  var l = Math.floor(b) % h;
  var q = this.Nodes[this.clampPathIndex(l - 1, h)];
  var n = this.Nodes[this.clampPathIndex(l + 0, h)];
  var m = this.Nodes[this.clampPathIndex(l + 1, h)];
  var k = this.Nodes[this.clampPathIndex(l + 2, h)];
  var j = 2 * o * o * o - 3 * o * o + 1;
  var i = -2 * o * o * o + 3 * o * o;
  var g = o * o * o - 2 * o * o + o;
  var f = o * o * o - o * o;
  var d = m.substract(q);
  d.multiplyThisWithScal(this.Tightness);
  var c = k.substract(n);
  c.multiplyThisWithScal(this.Tightness);
  e = n.multiplyWithScal(j);
  e.addToThis(m.multiplyWithScal(i));
  e.addToThis(d.multiplyWithScal(g));
  e.addToThis(c.multiplyWithScal(f));
  if (!a) {
    if (!this.AbsoluteTransformation) {
      this.updateAbsolutePosition();
    }
    this.AbsoluteTransformation.transformVect(e);
  }
  return e;
};
CL3D.SoundSceneNode = function() {
  this.init();
  this.Box = new CL3D.Box3d;
  this.MinDistance = 0;
  this.MaxDistance = 0;
  this.PlayMode = 0;
  this.DeleteWhenFinished = false;
  this.MaxTimeInterval = 0;
  this.MinTimeInterval = 0;
  this.Volume = 0;
  this.PlayAs2D = false;
  this.PlayingSound = null;
  this.SoundPlayCompleted = false;
  this.TimeMsDelayFinished = 0;
  this.PlayedCount = 0;
};
CL3D.SoundSceneNode.prototype = new CL3D.SceneNode;
CL3D.SoundSceneNode.prototype.getBoundingBox = function() {
  return this.Box;
};
CL3D.SoundSceneNode.prototype.getType = function() {
  return "sound";
};
CL3D.SoundSceneNode.prototype.OnRegisterSceneNode = function(a) {
  if (this.Visible) {
    a.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
    CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, a);
  }
};
CL3D.SoundSceneNode.prototype.get2DAngle = function(c, b) {
  if (b == 0) {
    return c < 0 ? 180 : 0;
  } else {
    if (c == 0) {
      return b < 0 ? 90 : 270;
    }
  }
  var a = b / Math.sqrt(c * c + b * b);
  a = Math.atan(Math.sqrt(1 - a * a) / a) * CL3D.RADTODEG;
  if (c > 0 && b > 0) {
    return a + 270;
  } else {
    if (c > 0 && b < 0) {
      return a + 90;
    } else {
      if (c < 0 && b < 0) {
        return 90 - a;
      } else {
        if (c < 0 && b > 0) {
          return 270 - a;
        }
      }
    }
  }
  return a;
};
CL3D.SoundSceneNode.prototype.normalizeAngle = function(a) {
  return(a % 360 + 360) % 360;
};
CL3D.SoundSceneNode.normalizeRelativeAngle = function(a) {
  return(a + 7 * 180) % 360 - 1800;
};
CL3D.SoundSceneNode.prototype.updateSoundFor3DSound = function(d, c, i) {
  var f = this.Volume;
  if (!i) {
    return;
  }
  if (!d) {
    return;
  }
  var a = i.getActiveCamera();
  if (!a) {
    return;
  }
  var g = a.getAbsolutePosition();
  var e = a.getTarget().substract(g);
  var b = g.getDistanceTo(c);
  if (b < this.MinDistance) {
  } else {
    b -= this.MinDistance;
    var k = this.MaxDistance - this.MinDistance;
    if (k > 0) {
      if (false) {
        var j = b / k;
        f = f * (10 - j);
      } else {
        if (b > k) {
          b = k;
        }
        var h = 10;
        if (b != 0) {
          h = this.MinDistance / b;
        }
        b *= this.RollOffFactor;
        f = f * h;
      }
      if (f > 10) {
        f = 10;
      }
    } else {
      f = 10;
    }
  }
  if (f > 1) {
    f = 1;
  }
  CL3D.gSoundManager.setVolume(d, f);
};
CL3D.SoundSceneNode.prototype.startSound = function(a) {
  if (!this.PlayingSound && this.TheSound) {
    this.SoundPlayCompleted = false;
    this.PlayingSound = CL3D.gSoundManager.play2D(this.TheSound, a);
    if (!this.PlayAs2D) {
      var b = this.getAbsolutePosition();
      this.updateSoundFor3DSound(this.PlayingSound, b, this.scene);
    }
  }
};
CL3D.SoundSceneNode.prototype.OnAnimate = function(b, f) {
  try {
    var d = this.getAbsolutePosition();
    if (this.PlayingSound && !this.PlayAs2D) {
      this.updateSoundFor3DSound(this.PlayingSound, d, b);
    }
    switch(this.PlayMode) {
      case 0:
        break;
      case 1:
        if (this.PlayingSound && this.PlayingSound.hasPlayingCompleted()) {
          this.PlayingSound = null;
          var c = this.MaxTimeInterval - this.MinTimeInterval;
          if (c < 2) {
            c = 2;
          }
          this.TimeMsDelayFinished = f + Math.random() * c + this.MinTimeInterval;
        } else {
          if (!this.PlayingSound && (!this.TimeMsDelayFinished || f > this.TimeMsDelayFinished)) {
            if (this.TheSound) {
              this.startSound(false);
            }
          }
        }
        break;
      case 2:
        if (!this.PlayingSound) {
          if (this.TheSound) {
            this.startSound(true);
          }
        }
        break;
      case 3:
        if (this.PlayedCount) {
        } else {
          if (this.TheSound) {
            this.startSound(true);
            ++this.PlayedCount;
          }
        }
        break;
    }
  } catch (a) {
  }
  return false;
};
CL3D.SoundSceneNode.prototype.createClone = function(b, a, e) {
  var d = new CL3D.SoundSceneNode;
  this.cloneMembers(d, b, a, e);
  if (this.Box) {
    d.Box = this.Box.clone();
  }
  return d;
};
CL3D.Overlay2DSceneNode = function(a) {
  this.init();
  this.engine = a;
  this.Box = new CL3D.Box3d;
  this.PosAbsoluteX = 100;
  this.PosAbsoluteY = 100;
  this.SizeAbsoluteWidth = 50;
  this.SizeAbsoluteHeight = 50;
  this.PosRelativeX = 0.5;
  this.PosRelativeY = 0.5;
  this.SizeRelativeWidth = 1 / 6;
  this.SizeRelativeHeight = 1 / 6;
  this.SizeModeIsAbsolute = true;
  this.ShowBackGround = true;
  this.BackGroundColor = 0;
  this.Texture = null;
  this.TextureHover = null;
  this.RetainAspectRatio = true;
  this.DrawText = false;
  this.TextAlignment = 1;
  this.Text = "";
  this.FontName = "";
  this.TextColor = 0;
  this.AnimateOnHover = false;
  this.OnHoverSetFontColor = false;
  this.HoverFontColor = false;
  this.OnHoverSetBackgroundColor = false;
  this.HoverBackgroundColor = false;
  this.OnHoverDrawTexture = false;
  this.TextTexture = null;
  this.TextHoverTexture = null;
  this.CreatedTextTextureText = "";
  this.CreatedTextTextureFontName = "";
  this.CurrentFontPixelHeight = 0;
};
CL3D.Overlay2DSceneNode.prototype = new CL3D.SceneNode;
CL3D.Overlay2DSceneNode.prototype.FontName = "";
CL3D.Overlay2DSceneNode.prototype.TextColor = 0;
CL3D.Overlay2DSceneNode.prototype.TextAlignment = 1;
CL3D.Overlay2DSceneNode.prototype.blocksCameraInput = function() {
  return false;
};
CL3D.Overlay2DSceneNode.prototype.getBoundingBox = function() {
  return this.Box;
};
CL3D.Overlay2DSceneNode.prototype.getType = function() {
  return "2doverlay";
};
CL3D.Overlay2DSceneNode.prototype.set2DPosition = function(b, d, c, a) {
  this.PosAbsoluteX = b;
  this.PosAbsoluteY = d;
  this.SizeAbsoluteWidth = c;
  this.SizeAbsoluteHeight = a;
  this.SizeModeIsAbsolute = true;
};
CL3D.Overlay2DSceneNode.prototype.setShowBackgroundColor = function(b, a) {
  this.ShowBackGround = b;
  if (this.ShowBackGround) {
    this.BackGroundColor = a;
  }
};
CL3D.Overlay2DSceneNode.prototype.setShowImage = function(a) {
  this.Texture = a;
};
CL3D.Overlay2DSceneNode.prototype.setText = function(a) {
  this.Text = a;
  this.DrawText = this.Text != null && this.Text != "";
  if (this.FontName == "") {
    this.FontName = "12;default;arial;normal;bold;true";
  }
};
CL3D.Overlay2DSceneNode.prototype.OnRegisterSceneNode = function(a) {
  if (this.Visible) {
    a.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_2DOVERLAY);
    CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, a);
  }
};
CL3D.Overlay2DSceneNode.prototype.render = function(l) {
  var d = this.getScreenCoordinatesRect(true, l);
  var f = d;
  var k = false;
  if (this.engine != null && this.AnimateOnHover) {
    var c = this.engine.getMouseX();
    var b = this.engine.getMouseY();
    k = d.x <= c && (d.y <= b && (d.x + d.w >= c && d.y + d.h >= b));
  }
  if (k && this.OnHoverSetBackgroundColor) {
    l.draw2DRectangle(d.x, d.y, d.w, d.h, this.HoverBackgroundColor, true);
  } else {
    if (this.ShowBackGround) {
      l.draw2DRectangle(d.x, d.y, d.w, d.h, this.BackGroundColor, true);
    }
  }
  var n = this.Texture;
  if (k && (this.TextureHover && this.OnHoverDrawTexture)) {
    n = this.TextureHover;
  }
  if (n != null && n.isLoaded()) {
    var m = n.getWidth();
    var j = n.getHeight();
    if (!this.RetainAspectRatio) {
      l.draw2DImage(d.x, d.y, d.w, d.h, n, true);
    } else {
      if (m && (j && (d.h && d.w))) {
        var p = j / m;
        var a = d.w;
        var o = a * p;
        if (o > d.h) {
          var r = d.h / o;
          a *= r;
          o *= r;
        }
        d.w = a;
        d.h = o;
        f = d;
        l.draw2DImage(d.x, d.y, d.w, d.h, n, true);
      }
    }
  }
  if (this.DrawText && (this.FontName && this.Text != "")) {
    this.createNewTextTexturesIfNecessary(l, d.w);
    var i = this.TextTexture;
    var e = this.TextColor;
    if (k) {
      if (this.TextHoverTexture) {
        i = this.TextHoverTexture;
      }
      e = this.HoverFontColor;
    }
    if (i) {
      var g = i.OriginalWidth;
      var q = i.OriginalHeight;
      if (this.TextAlignment == 1) {
        l.draw2DFontImage(d.x + (d.w - g) / 2, d.y + (d.h - q) / 2, g, q, i, e);
      } else {
        l.draw2DFontImage(d.x, d.y, g, q, i, e);
      }
    }
  } else {
    this.destroyTextTextures(l);
  }
};
CL3D.Overlay2DSceneNode.prototype.destroyTextTextures = function(a) {
  a.deleteTexture(this.TextTexture);
  a.deleteTexture(this.TextHoverTexture);
  this.TextTexture = null;
  this.TextHoverTexture = null;
};
CL3D.Overlay2DSceneNode.prototype.createNewTextTexturesIfNecessary = function(k, d) {
  var g = false;
  var a = this.TextTexture == null || g && this.TextHoverTexture == null;
  if (!a) {
    a = this.CreatedTextTextureText != this.Text || this.CreatedTextTextureFontName != this.FontName;
  }
  if (!a) {
    return;
  }
  this.destroyTextTextures(k);
  var c = document.createElement("canvas");
  if (c == null) {
    return;
  }
  c.width = 1;
  c.height = 1;
  var p = null;
  try {
    p = c.getContext("2d");
    if (p == null) {
      return;
    }
  } catch (f) {
    return;
  }
  var q = 12;
  var e = this.parseCopperCubeFontString(this.FontName);
  p.font = e;
  if (this.TextAlignment == 2) {
    var b = new Array;
    this.breakText(b, d, this.Text, p);
    var m = this.CurrentFontPixelHeight * 1.2;
    var o = b.length;
    var l = 0;
    c.width = d;
    c.height = Math.max(1, o * m);
    p.fillStyle = "rgba(0, 0, 0, 1)";
    p.fillRect(0, 0, c.width, c.height);
    p.fillStyle = "rgba(255, 255, 255, 1)";
    p.textBaseline = "top";
    p.font = e;
    for (var h = 0;h < b.length;++h) {
      p.fillText(b[h], 0, l);
      l += m;
    }
  } else {
    var j = p.measureText(this.Text);
    c.width = j.width;
    c.height = this.CurrentFontPixelHeight * 1.2;
    p.fillStyle = "rgba(0, 0, 0, 1)";
    p.fillRect(0, 0, c.width, c.height);
    p.fillStyle = "rgba(255, 255, 255, 1)";
    p.textBaseline = "top";
    p.font = e;
    p.fillText(this.Text, 0, 0);
  }
  var n = k.createTextureFrom2DCanvas(c, true);
  this.TextTexture = n;
  this.TextHoverTexture = n;
  this.CreatedTextTextureText = this.Text;
  this.CreatedTextTextureFontName = this.FontName;
};
CL3D.Overlay2DSceneNode.prototype.breakText = function(f, g, o, p) {
  var t = "";
  var a = "";
  var b = "";
  var m = 0;
  var r = o.length;
  var e = 0;
  var n = g - 6;
  var l = "c";
  var j = true;
  for (var h = 0;h < r;++h) {
    l = o.charAt(h);
    var k = false;
    if (l == "\r") {
      k = true;
      l = " ";
      if (o.charAt(h + 1) == "\n") {
        o = o.substr(0, h).concat(o.substr(h + 2));
        --r;
      }
    } else {
      if (l == "\n") {
        k = true;
        l = " ";
      }
    }
    if (l == " " || (l == 0 || h == r - 1)) {
      if (a.length) {
        var q = p.measureText(b).width;
        var d = p.measureText(a).width;
        if (j && e + d + q > n) {
          e = d;
          f.push(t);
          m = h - a.length;
          t = a;
        } else {
          t = t.concat(b);
          t = t.concat(a);
          e += q + d;
        }
        a = "";
        b = "";
      }
      b = b.concat(l);
      if (k) {
        t = t.concat(b);
        t = t.concat(a);
        f.push(t);
        m = h + 1;
        t = "";
        a = "";
        b = "";
        e = 0;
      }
    } else {
      a = a.concat(l);
    }
  }
  t = t.concat(b);
  t = t.concat(a);
  f.push(t);
};
CL3D.Overlay2DSceneNode.prototype.getMaterialCount = function() {
  return 0;
};
CL3D.Overlay2DSceneNode.prototype.getScreenCoordinatesRect = function(d, e) {
  var b = e.getWidth();
  var c = e.getHeight();
  var a = new Object;
  if (this.SizeModeIsAbsolute) {
    a.x = this.PosAbsoluteX;
    a.y = this.PosAbsoluteY;
    a.w = this.SizeAbsoluteWidth;
    a.h = this.SizeAbsoluteHeight;
  } else {
    a.x = this.PosRelativeX * b;
    a.y = this.PosRelativeY * c;
    a.w = this.SizeRelativeWidth * b;
    a.h = this.SizeRelativeHeight * c;
  }
  return a;
};
CL3D.Overlay2DSceneNode.prototype.createClone = function(b, a, e) {
  var d = new CL3D.Overlay2DSceneNode;
  this.cloneMembers(d, b, a, e);
  d.PosAbsoluteX = this.PosAbsoluteX;
  d.PosAbsoluteY = this.PosAbsoluteY;
  d.SizeAbsoluteWidth = this.SizeAbsoluteWidth;
  d.SizeAbsoluteHeight = this.SizeAbsoluteHeight;
  d.PosRelativeX = this.PosRelativeX;
  d.PosRelativeY = this.PosRelativeY;
  d.SizeRelativeWidth = this.SizeRelativeWidth;
  d.SizeRelativeHeight = this.SizeRelativeHeight;
  d.SizeModeIsAbsolute = this.SizeModeIsAbsolute;
  d.ShowBackGround = this.ShowBackGround;
  d.BackGroundColor = this.BackGroundColor;
  d.Texture = this.Texture;
  d.TextureHover = this.TextureHover;
  d.RetainAspectRatio = this.RetainAspectRatio;
  d.DrawText = this.DrawText;
  d.TextAlignment = this.TextAlignment;
  d.Text = this.Text;
  d.FontName = this.FontName;
  d.TextColor = this.TextColor;
  d.AnimateOnHover = this.AnimateOnHover;
  d.OnHoverSetFontColor = this.OnHoverSetFontColor;
  d.HoverFontColor = this.HoverFontColor;
  d.OnHoverSetBackgroundColor = this.OnHoverSetBackgroundColor;
  d.HoverBackgroundColor = this.HoverBackgroundColor;
  d.OnHoverDrawTexture = this.OnHoverDrawTexture;
  return d;
};
CL3D.Overlay2DSceneNode.prototype.parseCopperCubeFontString = function(c) {
  var d = 12;
  var f = "Arial";
  var g = false;
  var a = false;
  if (c.indexOf("#fnt_") == 0) {
    c = c.substr(5);
  }
  var k = c.split(";");
  for (var e = 0;e < k.length;++e) {
    var l = k[e];
    var b = l.toLowerCase();
    if (e == 0) {
      var j = parseInt(b);
      d = j;
    } else {
      if (e == 2) {
        f = l;
      } else {
        if (e == 3) {
          if (b.indexOf("italic") != -1) {
            g = true;
          }
        } else {
          if (e == 4) {
            if (b.indexOf("bold") != -1) {
              a = true;
            }
          }
        }
      }
    }
  }
  var h = "";
  if (g) {
    h += "italic ";
  }
  if (a) {
    h += "bold ";
  }
  this.CurrentFontPixelHeight = d * 96 / 72;
  h += this.CurrentFontPixelHeight + "px ";
  h += f;
  return h;
};
CL3D.Mobile2DInputSceneNode = function(a, b) {
  CL3D.Overlay2DSceneNode.call(this, a);
  this.CursorTex = null;
  this.CursorPosX = 0;
  this.CursorPosY = 0;
  this.MouseOverButton = false;
  this.RealWidth = 0;
  this.RealHeight = 0;
  this.RealPosX = 0;
  this.RealPosY = 0;
  this.InputMode = 0;
  this.KeyCode = 0;
  this.addAnimator(new CL3D.AnimatorMobileInput(a, b, this));
};
CL3D.Mobile2DInputSceneNode.prototype = new CL3D.Overlay2DSceneNode;
CL3D.Mobile2DInputSceneNode.prototype.getType = function() {
  return "mobile2dinput";
};
CL3D.Mobile2DInputSceneNode.prototype.blocksCameraInput = function() {
  return true;
};
CL3D.Mobile2DInputSceneNode.prototype.render = function(n) {
  var d = this.getScreenCoordinatesRect(true, n);
  var o = d;
  var b = false;
  if (this.engine != null) {
    var y = this.engine.getMouseX();
    var v = this.engine.getMouseY();
    this.MouseOverButton = d.x <= y && (d.y <= v && (d.x + d.w >= y && d.y + d.h >= v));
    if (this.AnimateOnHover) {
      b = this.MouseOverButton;
    }
  }
  if (b && this.OnHoverSetBackgroundColor) {
    n.draw2DRectangle(d.x, d.y, d.w, d.h, this.HoverBackgroundColor, true);
  } else {
    if (this.ShowBackGround) {
      n.draw2DRectangle(d.x, d.y, d.w, d.h, this.BackGroundColor, true);
    }
  }
  var z = this.Texture;
  if (b && (this.TextureHover && this.OnHoverDrawTexture)) {
    z = this.TextureHover;
  }
  var g = 0;
  var f = 0;
  if (z != null && z.isLoaded()) {
    var j = z.getWidth();
    var p = z.getHeight();
    if (!this.RetainAspectRatio) {
      n.draw2DImage(d.x, d.y, d.w, d.h, z, true);
      g = d.w;
      f = d.h;
    } else {
      if (j && (p && (d.h && d.w))) {
        var a = p / j;
        var m = d.w;
        var k = m * a;
        if (k > d.h) {
          var c = d.h / k;
          m *= c;
          k *= c;
        }
        d.w = m;
        d.h = k;
        o = d;
        n.draw2DImage(d.x, d.y, d.w, d.h, z, true);
        g = d.w;
        f = d.h;
      }
    }
  }
  this.RealWidth = g;
  this.RealHeight = f;
  this.RealPosX = d.x;
  this.RealPosY = d.y;
  if (this.InputMode == 0 && (this.CursorTex != null && (this.CursorTex.isLoaded() && (z != null && z.isLoaded())))) {
    var x = this.CursorPosX * Math.sqrt(1 - 0.5 * (this.CursorPosY * this.CursorPosY));
    var u = this.CursorPosY * Math.sqrt(1 - 0.5 * (this.CursorPosX * this.CursorPosX));
    x = (x + 1) * 0.5;
    u = (u + 1) * 0.5;
    var t = 1 / (z.getWidth() / Number(this.CursorTex.getWidth()));
    var r = 1 / (z.getHeight() / Number(this.CursorTex.getHeight()));
    var e = t * g;
    var q = r * f;
    var i = d.x + x * g - e * 0.5;
    var l = d.y + u * f - q * 0.5;
    n.draw2DImage(i, l, e, q, this.CursorTex, true);
  }
};
CL3D.HotspotSceneNode = function() {
  this.Box = new CL3D.Box3d;
  this.Width = 0;
  this.Height = 0;
};
CL3D.HotspotSceneNode.prototype = new CL3D.SceneNode;
CL3D.DummyTransformationSceneNode = function() {
  this.init();
  this.Box = new CL3D.Box3d;
  this.RelativeTransformationMatrix = new CL3D.Matrix4;
};
CL3D.DummyTransformationSceneNode.prototype = new CL3D.SceneNode;
CL3D.DummyTransformationSceneNode.prototype.createClone = function(b, a, e) {
  var d = new CL3D.DummyTransformationSceneNode;
  this.cloneMembers(d, b, a, e);
  if (this.Box) {
    d.Box = this.Box.clone();
  }
  if (this.RelativeTransformationMatrix) {
    d.RelativeTransformationMatrix = this.RelativeTransformationMatrix;
  }
  return d;
};
CL3D.DummyTransformationSceneNode.prototype.getRelativeTransformation = function() {
  return this.RelativeTransformationMatrix;
};
CL3D.AnimatedMeshSceneNode = function() {
  this.init();
  this.Box = new CL3D.Box3d;
  this.DoesCollision = false;
  this.Mesh = null;
  this.Selector = null;
  this.LastLODSkinnedAnimationTime = 0;
  this.Transiting = 0;
  this.TransitingBlend = 0;
  this.Materials = new Array;
  this.FramesPerSecond = 25 / 100;
  this.BeginFrameTime = CL3D.CLTimer.getTime();
  this.FrameWhenCurrentMeshWasGenerated = 0;
  this.StartFrame = 0;
  this.EndFrame = 0;
  this.Looping = false;
  this.CurrentFrameNr = 0;
  this.MinimalUpdateDelay = 20;
};
CL3D.AnimatedMeshSceneNode.prototype = new CL3D.SceneNode;
CL3D.AnimatedMeshSceneNode.prototype.getBoundingBox = function() {
  return this.Box;
};
CL3D.AnimatedMeshSceneNode.prototype.getNamedAnimationCount = function() {
  if (this.Mesh && this.Mesh.NamedAnimationRanges) {
    return this.Mesh.NamedAnimationRanges.length;
  }
  return 0;
};
CL3D.AnimatedMeshSceneNode.prototype.getNamedAnimationInfo = function(b) {
  var a = this.getNamedAnimationCount();
  if (b >= 0 && b < a) {
    return this.Mesh.NamedAnimationRanges[b];
  }
  return null;
};
CL3D.AnimatedMeshSceneNode.prototype.setAnimation = function(a) {
  if (!this.Mesh) {
    return false;
  }
  var b = this.Mesh.getNamedAnimationRangeByName(a);
  if (!b) {
    return false;
  }
  this.setFrameLoop(b.Begin, b.End);
  this.setAnimationSpeed(b.FPS);
  return true;
};
CL3D.AnimatedMeshSceneNode.prototype.setAnimationByEditorName = function(c, a) {
  if (!this.Mesh) {
    return false;
  }
  var e = this.Mesh;
  if (!e) {
    return false;
  }
  var b = e.getNamedAnimationRangeByName(c);
  if (b) {
    this.setFrameLoop(b.Begin, b.End);
    if (b.FPS != 0) {
      this.setAnimationSpeed(b.FPS);
    }
    this.setLoopMode(a);
  } else {
    if (c) {
      var d = c.toLowerCase();
      if (d == "all") {
        this.setFrameLoop(0, e.getFrameCount());
        if (e.DefaultFPS != 0) {
          this.setAnimationSpeed(e.DefaultFPS);
        }
        this.setLoopMode(a);
      } else {
        if (d == "none") {
          this.setFrameLoop(0, 0);
          this.setLoopMode(a);
        }
      }
    }
  }
  return true;
};
CL3D.AnimatedMeshSceneNode.prototype.setMesh = function(a) {
  if (!a) {
    return;
  }
  this.Mesh = a;
  this.Box = a.getBoundingBox();
  this.setFrameLoop(0, a.getFrameCount());
};
CL3D.AnimatedMeshSceneNode.prototype.getType = function() {
  return "animatedmesh";
};
CL3D.AnimatedMeshSceneNode.prototype.OnRegisterSceneNode = function(c) {
  if (this.Visible && this.Mesh) {
    var b = this.Materials;
    var d = false;
    if (b != null) {
      for (var a = 0;a < b.length;++a) {
        if (b[a].isTransparent()) {
          d = true;
        }
      }
    }
    if (d) {
      c.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_TRANSPARENT);
    } else {
      c.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
    }
    CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, c);
  }
};
CL3D.AnimatedMeshSceneNode.prototype.getMaterialCount = function() {
  if (this.Materials != null) {
    return this.Materials.length;
  }
  if (this.OwnedMesh) {
    return this.OwnedMesh.MeshBuffers.length;
  }
  return 0;
};
CL3D.AnimatedMeshSceneNode.prototype.getMaterial = function(a) {
  if (this.Materials) {
    if (a >= 0 && a < this.Materials.length) {
      return this.Materials[a];
    } else {
      if (this.Mesh && (this.Mesh.AnimatedMeshesToLink && (a >= 0 && (this.Materials.length == a && a < 256)))) {
        var b = new CL3D.Material;
        this.Materials.push(b);
        return b;
      }
    }
  }
  return null;
};
CL3D.AnimatedMeshSceneNode.prototype.createClone = function(d, b, f) {
  var e = new CL3D.AnimatedMeshSceneNode;
  this.cloneMembers(e, d, b, f);
  e.Mesh = this.Mesh;
  if (this.Box) {
    e.Box = this.Box.clone();
  }
  e.DoesCollision = this.DoesCollision;
  e.Selector = this.Selector;
  e.LastLODSkinnedAnimationTime = this.LastLODSkinnedAnimationTime;
  e.Transiting = this.Transiting;
  e.TransitingBlend = this.TransitingBlend;
  e.Materials = new Array;
  for (var a = 0;a < this.Materials.length;++a) {
    e.Materials.push(this.Materials[a].clone());
  }
  e.FramesPerSecond = this.FramesPerSecond;
  e.BeginFrameTime = this.BeginFrameTime;
  e.FrameWhenCurrentMeshWasGenerated = this.FrameWhenCurrentMeshWasGenerated;
  e.StartFrame = this.StartFrame;
  e.EndFrame = this.EndFrame;
  e.Looping = this.Looping;
  e.CurrentFrameNr = this.CurrentFrameNr;
  e.MinimalUpdateDelay = this.MinimalUpdateDelay;
  return e;
};
CL3D.AnimatedMeshSceneNode.prototype.setAnimationSpeed = function(a) {
  this.FramesPerSecond = a;
};
CL3D.AnimatedMeshSceneNode.prototype.setLoopMode = function(a) {
  this.Looping = a;
};
CL3D.AnimatedMeshSceneNode.prototype.setFrameLoop = function(d, a) {
  if (!this.Mesh) {
    return false;
  }
  var b = this.Mesh.getFrameCount() - 1;
  var e = this.StartFrame;
  var c = this.EndFrame;
  if (a < d) {
    this.StartFrame = CL3D.clamp(a, 0, b);
    this.EndFrame = CL3D.clamp(d, this.StartFrame, b);
  } else {
    this.StartFrame = CL3D.clamp(d, 0, b);
    this.EndFrame = CL3D.clamp(a, this.StartFrame, b);
  }
  if (e != this.StartFrame || c != this.EndFrame) {
    this.setCurrentFrame(this.StartFrame);
  }
  return true;
};
CL3D.AnimatedMeshSceneNode.prototype.setCurrentFrame = function(a) {
  this.CurrentFrameNr = CL3D.clamp(a, this.StartFrame, this.EndFrame);
  this.BeginFrameTime = CL3D.CLTimer.getTime() - Math.floor((this.CurrentFrameNr - this.StartFrame) / this.FramesPerSecond);
};
CL3D.AnimatedMeshSceneNode.prototype.buildFrameNr = function(d) {
  var c = 0;
  if (this.Transiting != 0) {
    this.TransitingBlend = (d - this.BeginFrameTime) * this.Transiting;
    if (this.TransitingBlend > 1) {
      this.Transiting = 0;
      this.TransitingBlend = 0;
    }
  }
  if (this.StartFrame == this.EndFrame) {
    return this.StartFrame;
  }
  if (this.FramesPerSecond == 0) {
    return this.StartFrame;
  }
  var b = 0;
  if (this.Looping) {
    var a = Math.abs(Math.floor((this.EndFrame - this.StartFrame) / this.FramesPerSecond));
    if (this.FramesPerSecond > 0) {
      b = this.StartFrame + (d - this.BeginFrameTime) % a * this.FramesPerSecond;
    } else {
      b = this.EndFrame - (d - this.BeginFrameTime) % a * -this.FramesPerSecond;
    }
  } else {
    if (this.FramesPerSecond > 0) {
      c = (d - this.BeginFrameTime) * this.FramesPerSecond;
      b = this.StartFrame + c;
      if (b > this.EndFrame) {
        b = this.EndFrame;
      }
    } else {
      c = (d - this.BeginFrameTime) * -this.FramesPerSecond;
      b = this.EndFrame - c;
      if (b < this.StartFrame) {
        b = this.StartFrame;
      }
    }
  }
  return b;
};
CL3D.AnimatedMeshSceneNode.prototype.getFrameNr = function() {
  return this.CurrentFrameNr;
};
CL3D.AnimatedMeshSceneNode.prototype.hasDynamicLightedMaterials = function() {
  for (var a = 0;a < this.Materials.length;++a) {
    if (this.Materials[a].Lighting) {
      return true;
    }
  }
  return false;
};
CL3D.AnimatedMeshSceneNode.prototype.calculateMeshForCurrentFrame = function() {
  var d = this.Mesh;
  if (!d) {
    return;
  }
  var b = false;
  b = d.animateMesh(this.getFrameNr(), 1);
  if (b) {
    d.skinMesh(this.hasDynamicLightedMaterials());
    d.updateBoundingBox();
    this.Box = d.getBoundingBox().clone();
    for (var c = 0;c < d.LocalBuffers.length;++c) {
      var a = d.LocalBuffers[c];
      a.update(true);
    }
  }
  this.FrameWhenCurrentMeshWasGenerated = this.CurrentFrameNr;
};
CL3D.AnimatedMeshSceneNode.prototype.setMinimalUpdateDelay = function(a) {
  this.MinimalUpdateDelay = a;
};
CL3D.AnimatedMeshSceneNode.prototype.OnAnimate = function(c, e) {
  var b = false;
  var a = CL3D.CLTimer.getTime();
  if (this.LastLODSkinnedAnimationTime == 0 || a - this.LastLODSkinnedAnimationTime > this.MinimalUpdateDelay) {
    var d = this.buildFrameNr(e);
    b = this.CurrentFrameNr != d;
    this.CurrentFrameNr = d;
    this.LastLODSkinnedAnimationTime = a;
  }
  return CL3D.SceneNode.prototype.OnAnimate.call(this, c, e);
};
CL3D.AnimatedMeshSceneNode.prototype.render = function(d) {
  var b = this.scene.getCurrentCameraFrustrum();
  if (b) {
    if (!b.isBoxInside(this.getTransformedBoundingBox())) {
      return;
    }
  }
  var e = this.Mesh;
  if (e) {
    d.setWorld(this.AbsoluteTransformation);
    this.calculateMeshForCurrentFrame();
    for (var c = 0;c < e.LocalBuffers.length;++c) {
      var a = e.LocalBuffers[c];
      if (c < this.Materials.length) {
        a.Mat = this.Materials[c];
      }
      if (a.Transformation != null) {
        d.setWorld(this.AbsoluteTransformation.multiply(a.Transformation));
      }
      d.setMaterial(a.Mat);
      d.drawMeshBuffer(a);
      if (a.Transformation != null) {
        d.setWorld(this.AbsoluteTransformation);
      }
    }
  }
};
CL3D.Animator = function() {
  this.Type = -1;
};
CL3D.Animator.prototype.getType = function() {
  return "none";
};
CL3D.Animator.prototype.animateNode = function(b, a) {
  return false;
};
CL3D.Animator.prototype.onMouseDown = function(a) {
};
CL3D.Animator.prototype.onMouseWheel = function(a) {
};
CL3D.Animator.prototype.onMouseUp = function(a) {
};
CL3D.Animator.prototype.onMouseMove = function(a) {
};
CL3D.Animator.prototype.onKeyDown = function(a) {
  return false;
};
CL3D.Animator.prototype.onKeyUp = function(a) {
  return false;
};
CL3D.Animator.prototype.reset = function(a) {
};
CL3D.Animator.prototype.findActionByType = function(a) {
  return null;
};
CL3D.Animator.prototype.createClone = function(a, c, b, d) {
  return null;
};
CL3D.AnimatorCameraFPS = function(b, a) {
  this.Type = -1;
  this.lastAnimTime = 0;
  this.NoVerticalMovement = false;
  this.moveByMouseDown = true;
  this.moveByMouseMove = false;
  this.moveByPanoDrag = false;
  this.leftKeyDown = false;
  this.rightKeyDown = false;
  this.upKeyDown = false;
  this.downKeyDown = false;
  this.jumpKeyDown = false;
  this.relativeRotationX = 0;
  this.relativeRotationY = 0;
  this.minZoom = 20;
  this.maxZoom = 100;
  this.zoomSpeed = (this.maxZoom - this.minZoom) / 50;
  this.targetZoomValue = 90;
  this.lastAnimTime = CL3D.CLTimer.getTime();
  this.Camera = b;
  this.CursorControl = a;
  if (b) {
    this.lookAt(b.getTarget());
  }
};
CL3D.AnimatorCameraFPS.prototype = new CL3D.Animator;
CL3D.AnimatorCameraFPS.prototype.getType = function() {
  return "camerafps";
};
CL3D.AnimatorCameraFPS.prototype.MaxVerticalAngle = 88;
CL3D.AnimatorCameraFPS.prototype.MoveSpeed = 0.06;
CL3D.AnimatorCameraFPS.prototype.RotateSpeed = 200;
CL3D.AnimatorCameraFPS.prototype.JumpSpeed = 0;
CL3D.AnimatorCameraFPS.prototype.NoVerticalMovement = false;
CL3D.AnimatorCameraFPS.prototype.MayMove = true;
CL3D.AnimatorCameraFPS.prototype.MayZoom = true;
CL3D.AnimatorCameraFPS.prototype.setMayMove = function(a) {
  this.MayMove = a;
};
CL3D.AnimatorCameraFPS.prototype.setLookByMouseDown = function(a) {
  this.moveByMouseDown = a;
  this.moveByMouseMove = !a;
};
CL3D.AnimatorCameraFPS.prototype.lookAt = function(b) {
  if (this.Camera == null) {
    return;
  }
  var a = b.substract(this.Camera.Pos);
  a = a.getHorizontalAngle();
  this.relativeRotationX = a.X;
  this.relativeRotationY = a.Y;
  if (this.relativeRotationX > this.MaxVerticalAngle) {
    this.relativeRotationX -= 360;
  }
};
CL3D.AnimatorCameraFPS.prototype.animateNode = function(k, u) {
  if (this.Camera == null) {
    return false;
  }
  if (!(this.Camera.scene.getActiveCamera() === this.Camera)) {
    return false;
  }
  var b = CL3D.CLTimer.getTime();
  var j = b - this.lastAnimTime;
  if (j > 250) {
    j = 250;
  }
  this.lastAnimTime = b;
  var e = this.Camera.Pos.clone();
  if (this.MayMove && (this.upKeyDown || this.downKeyDown)) {
    var h = this.Camera.Pos.substract(this.Camera.getTarget());
    if (this.NoVerticalMovement) {
      h.Y = 0;
    }
    h.normalize();
    if (this.upKeyDown) {
      e.addToThis(h.multiplyWithScal(this.MoveSpeed * -j));
    }
    if (this.downKeyDown) {
      e.addToThis(h.multiplyWithScal(this.MoveSpeed * j));
    }
  }
  if (this.MayMove && (this.leftKeyDown || this.rightKeyDown)) {
    var d = this.Camera.Pos.substract(this.Camera.getTarget()).crossProduct(this.Camera.getUpVector());
    d.normalize();
    if (this.leftKeyDown) {
      d = d.multiplyWithScal(this.MoveSpeed * -j);
      e.addToThis(d);
      this.Camera.setTarget(this.Camera.getTarget().add(d));
    }
    if (this.rightKeyDown) {
      d = d.multiplyWithScal(this.MoveSpeed * j);
      e.addToThis(d);
      this.Camera.setTarget(this.Camera.getTarget().add(d));
    }
  }
  this.Camera.Pos = e;
  var w = new CL3D.Vect3d(0, 0, 1);
  var r = new CL3D.Matrix4;
  r.setRotationDegrees(new CL3D.Vect3d(this.relativeRotationX, this.relativeRotationY, 0));
  r.transformVect(w);
  var t = 300;
  var c = 0;
  var m = 1 / 5E4;
  var l = 1 / 5E4;
  var g = false;
  if (this.CursorControl != null && k.scene != null) {
    g = k.scene.isCoordOver2DOverlayNode(this.CursorControl.getMouseX(), this.CursorControl.getMouseY(), true) != null;
  }
  if (this.moveByMouseDown) {
    m *= 3;
    l *= 3;
  }
  if (!g) {
    if (this.moveByMouseMove) {
      var f = this.CursorControl.getRenderer().getHeight();
      var o = this.CursorControl.getMouseY();
      if (f > 0 && (o > 0 && this.CursorControl.isMouseOverCanvas())) {
        c = Math.sin((o - f / 2) / f) * 100 * 0.5;
      }
    } else {
      if (this.moveByMouseDown || this.moveByPanoDrag) {
        if (this.CursorControl.isMouseDown()) {
          c = this.CursorControl.getMouseY() - this.CursorControl.getMouseDownY();
          if (c != 0) {
            this.CursorControl.LastCameraDragTime = b;
          }
        }
      }
    }
  }
  c += this.getAdditionalYLookDiff();
  if (c > t) {
    c = t;
  }
  if (c < -t) {
    c = -t;
  }
  this.relativeRotationX += c * (j * (this.RotateSpeed * l));
  if (this.relativeRotationX < -this.MaxVerticalAngle) {
    this.relativeRotationX = -this.MaxVerticalAngle;
  }
  if (this.relativeRotationX > this.MaxVerticalAngle) {
    this.relativeRotationX = this.MaxVerticalAngle;
  }
  var i = 0;
  if (!g) {
    if (this.moveByMouseMove) {
      var q = this.CursorControl.getRenderer().getWidth();
      var p = this.CursorControl.getMouseX();
      if (q > 0 && (p > 0 && this.CursorControl.isMouseOverCanvas())) {
        i = Math.sin((p - q / 2) / q) * 100 * 0.5;
      }
    } else {
      if (this.moveByMouseDown || this.moveByPanoDrag) {
        if (this.CursorControl.isMouseDown()) {
          i = this.CursorControl.getMouseX() - this.CursorControl.getMouseDownX();
          if (i != 0) {
            this.CursorControl.LastCameraDragTime = b;
          }
        }
      }
    }
  }
  i += this.getAdditionalXLookDiff();
  if (i > t) {
    i = t;
  }
  if (i < -t) {
    i = -t;
  }
  this.relativeRotationY += i * (j * (this.RotateSpeed * m));
  if (this.moveByMouseDown || this.moveByPanoDrag) {
    this.CursorControl.setMouseDownWhereMouseIsNow();
  }
  if (this.MayMove && this.jumpKeyDown) {
    var v = k.getAnimatorOfType("collisionresponse");
    if (v && !v.isFalling()) {
      v.jump(this.JumpSpeed);
    }
  }
  this.Camera.setTarget(this.Camera.Pos.add(w));
  return false;
};
CL3D.AnimatorCameraFPS.prototype.onMouseDown = function(a) {
  CL3D.Animator.prototype.onMouseDown.call(this, a);
};
CL3D.AnimatorCameraFPS.prototype.onMouseWheel = function(a) {
};
CL3D.AnimatorCameraFPS.prototype.onMouseUp = function(a) {
  CL3D.Animator.prototype.onMouseUp.call(this, a);
};
CL3D.AnimatorCameraFPS.prototype.onMouseMove = function(a) {
  CL3D.Animator.prototype.onMouseMove.call(this, a);
};
CL3D.AnimatorCameraFPS.prototype.setKeyBool = function(b, a) {
  if (a == 37 || a == 65) {
    this.leftKeyDown = b;
    if (b) {
      this.rightKeyDown = false;
    }
    return true;
  }
  if (a == 39 || a == 68) {
    this.rightKeyDown = b;
    if (b) {
      this.leftKeyDown = false;
    }
    return true;
  }
  if (a == 38 || a == 87) {
    this.upKeyDown = b;
    if (b) {
      this.downKeyDown = false;
    }
    return true;
  }
  if (a == 40 || a == 83) {
    this.downKeyDown = b;
    if (b) {
      this.upKeyDown = false;
    }
    return true;
  }
  if (a == 32) {
    this.jumpKeyDown = b;
    return true;
  }
  return false;
};
CL3D.AnimatorCameraFPS.prototype.onKeyDown = function(a) {
  return this.setKeyBool(true, a.keyCode);
};
CL3D.AnimatorCameraFPS.prototype.onKeyUp = function(a) {
  return this.setKeyBool(false, a.keyCode);
};
CL3D.AnimatorCameraFPS.prototype.getAdditionalXLookDiff = function() {
  return 0;
};
CL3D.AnimatorCameraFPS.prototype.getAdditionalYLookDiff = function() {
  return 0;
};
CL3D.AnimatorCameraFPS.prototype.getAdditionalZoomDiff = function() {
  return 0;
};
CL3D.AnimatorCameraModelViewer = function(b, a) {
  this.Type = -1;
  this.RotateSpeed = 1E4;
  this.Radius = 100;
  this.NoVerticalMovement = false;
  this.lastAnimTime = CL3D.CLTimer.getTime();
  this.Camera = b;
  this.CursorControl = a;
  this.SlideAfterMovementEnd = false;
  this.SlidingSpeed = 0;
  this.SlidingMoveX = 0;
  this.SlidingMoveY = 0;
  this.AllowZooming = false;
  this.MinZoom = 0;
  this.MaxZoom = 0;
  this.ZoomSpeed = 0;
  this.TargetZoomValue = 90;
};
CL3D.AnimatorCameraModelViewer.prototype = new CL3D.Animator;
CL3D.AnimatorCameraModelViewer.prototype.getType = function() {
  return "cameramodelviewer";
};
CL3D.AnimatorCameraModelViewer.prototype.RotateSpeed = 0.06;
CL3D.AnimatorCameraModelViewer.prototype.Radius = 100;
CL3D.AnimatorCameraModelViewer.prototype.NoVerticalMovement = false;
CL3D.AnimatorCameraModelViewer.prototype.animateNode = function(e, c) {
  if (this.Camera == null) {
    return false;
  }
  if (!(this.Camera.scene.getActiveCamera() === this.Camera)) {
    return false;
  }
  var b = CL3D.CLTimer.getTime();
  var a = b - this.lastAnimTime;
  if (a > 250) {
    a = 250;
  }
  this.lastAnimTime = b;
  var p = this.Camera.Pos.clone();
  var k = this.Camera.Target.clone();
  var o = k.substract(this.Camera.getAbsolutePosition());
  var f = 0;
  var d = 0;
  if (this.CursorControl.isMouseDown()) {
    f = (this.CursorControl.getMouseX() - this.CursorControl.getMouseDownX()) * this.RotateSpeed / 5E4;
    d = (this.CursorControl.getMouseY() - this.CursorControl.getMouseDownY()) * this.RotateSpeed / 5E4;
  }
  if (this.SlideAfterMovementEnd && this.SlidingSpeed != 0) {
    if (CL3D.iszero(f)) {
      f = this.SlidingMoveX;
      this.SlidingMoveX *= 0.9;
      if (this.SlidingMoveX > 0) {
        this.SlidingMoveX = Math.max(0, this.SlidingMoveX - a / this.SlidingSpeed);
      } else {
        if (this.SlidingMoveX < 0) {
          this.SlidingMoveX = Math.min(0, this.SlidingMoveX + a / this.SlidingSpeed);
        }
      }
    } else {
      this.SlidingMoveX = f * (this.SlidingSpeed / 1E3);
    }
    if (CL3D.iszero(d)) {
      d = this.SlidingMoveY;
      this.SlidingMoveY *= 0.9;
      if (this.SlidingMoveY > 0) {
        this.SlidingMoveY = Math.max(0, this.SlidingMoveY - a / this.SlidingSpeed);
      } else {
        if (this.SlidingMoveY < 0) {
          this.SlidingMoveY = Math.min(0, this.SlidingMoveY + a / this.SlidingSpeed);
        }
      }
    } else {
      this.SlidingMoveY = d * (this.SlidingSpeed / 1E3);
    }
  }
  var m = o.crossProduct(this.Camera.UpVector);
  m.Y = 0;
  m.normalize();
  if (!CL3D.iszero(f)) {
    m.multiplyThisWithScal(a * f);
    p.addToThis(m);
  }
  if (!this.NoVerticalMovement && !CL3D.iszero(d)) {
    var h = this.Camera.UpVector.clone();
    h.normalize();
    var l = p.add(h.multiplyWithScal(a * d));
    var g = l.clone();
    g.Y = k.Y;
    var q = this.Radius / 10;
    if (g.getDistanceTo(k) > q) {
      p = l;
    }
  }
  this.CursorControl.setMouseDownWhereMouseIsNow();
  if (this.AllowZooming) {
    var i = CL3D.radToDeg(this.Camera.getFov());
    if (this.TargetZoomValue < this.MinZoom) {
      this.TargetZoomValue = this.MinZoom;
    }
    if (this.TargetZoomValue > this.MaxZoom) {
      this.TargetZoomValue = this.MaxZoom;
    }
    var j = this.ZoomSpeed;
    j = Math.abs(this.TargetZoomValue - i) / 8;
    if (j < this.ZoomSpeed) {
      j = this.ZoomSpeed;
    }
    if (i < this.MaxZoom - j && i < this.TargetZoomValue) {
      i += j;
      if (i > this.MaxZoom) {
        i = this.MaxZoom;
      }
    }
    if (i > this.MinZoom + j && i > this.TargetZoomValue) {
      i -= j;
      if (i < this.MinZoom) {
        i = this.MinZoom;
      }
    }
    this.Camera.setFov(CL3D.degToRad(i));
  }
  o = p.substract(k);
  o.setLength(this.Radius);
  p = k.add(o);
  this.Camera.Pos = p;
  return false;
};
CL3D.AnimatorCameraModelViewer.prototype.onMouseWheel = function(a) {
  this.TargetZoomValue += a * this.ZoomSpeed;
  if (this.TargetZoomValue < this.MinZoom) {
    this.TargetZoomValue = this.MinZoom;
  }
  if (this.TargetZoomValue > this.MaxZoom) {
    this.TargetZoomValue = this.MaxZoom;
  }
};
CL3D.AnimatorFollowPath = function(a) {
  this.TimeNeeded = 5E3;
  this.TriedToLinkWithPath = false;
  this.IsCamera = false;
  this.LookIntoMovementDirection = false;
  this.OnlyMoveWhenCameraActive = true;
  this.TimeDisplacement = 0;
  this.LastTimeCameraWasInactive = true;
  this.EndMode = CL3D.AnimatorFollowPath.EFPFEM_START_AGAIN;
  this.SwitchedToNextCamera = false;
  this.Manager = a;
  this.StartTime = 0;
  this.TriedToLinkWithPath = false;
  this.LastObject = null;
  this.PathNodeToFollow = null;
  this.SwitchedToNextCamera = false;
  this.PathToFollow = null;
  this.TimeDisplacement = 0;
  this.AdditionalRotation = null;
  this.CameraToSwitchTo = null;
  this.LastPercentageDoneActionFired = 0;
  this.bActionFired = false;
};
CL3D.AnimatorFollowPath.prototype = new CL3D.Animator;
CL3D.AnimatorFollowPath.EFPFEM_START_AGAIN = 0;
CL3D.AnimatorFollowPath.EFPFEM_STOP = 1;
CL3D.AnimatorFollowPath.EFPFEM_SWITCH_TO_CAMERA = 2;
CL3D.AnimatorFollowPath.prototype.getType = function() {
  return "followpath";
};
CL3D.AnimatorFollowPath.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorFollowPath;
  b.TimeNeeded = this.TimeNeeded;
  b.LookIntoMovementDirection = this.LookIntoMovementDirection;
  b.OnlyMoveWhenCameraActive = this.OnlyMoveWhenCameraActive;
  b.PathToFollow = this.PathToFollow;
  b.TimeDisplacement = this.TimeDisplacement;
  b.AdditionalRotation = this.AdditionalRotation ? this.AdditionalRotation.clone() : null;
  b.EndMode = this.EndMode;
  b.CameraToSwitchTo = this.CameraToSwitchTo;
  b.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(d, e) : null;
  return b;
};
CL3D.AnimatorFollowPath.prototype.setOptions = function(b, c, a) {
  this.EndMode = b;
  this.LookIntoMovementDirection = a;
  this.TimeNeeded = c;
};
CL3D.AnimatorFollowPath.prototype.animateNode = function(d, c) {
  if (d == null || (!this.Manager || !this.TimeNeeded)) {
    return false;
  }
  if (!(d === this.LastObject)) {
    this.setNode(d);
    return false;
  }
  this.linkWithPath();
  if (this.PathNodeToFollow == null) {
    return false;
  }
  var f = false;
  var a = null;
  if (this.IsCamera && this.OnlyMoveWhenCameraActive) {
    var e = !this.LastTimeCameraWasInactive;
    a = d;
    if (!(this.Manager.getActiveCamera() === a)) {
      if (this.PathNodeToFollow.Nodes.length) {
        a.Pos = this.PathNodeToFollow.getPathNodePosition(0);
      }
      this.LastTimeCameraWasInactive = true;
      return false;
    } else {
      this.LastTimeCameraWasInactive = false;
    }
    if (!this.StartTime || !e) {
      this.StartTime = c;
    }
  }
  if (!this.StartTime) {
    this.StartTime = this.Manager.getStartTime();
  }
  var o = (c - this.StartTime + this.TimeDisplacement) / this.TimeNeeded;
  if (o > 1 && !this.PathNodeToFollow.IsClosedCircle) {
    switch(this.EndMode) {
      case CL3D.AnimatorFollowPath.EFPFEM_START_AGAIN:
        o = o % 1;
        break;
      case CL3D.AnimatorFollowPath.EFPFEM_STOP:
        o = 1;
        break;
      case CL3D.AnimatorFollowPath.EFPFEM_SWITCH_TO_CAMERA:
        o = 1;
        if (!this.SwitchedToNextCamera) {
          this.switchToNextCamera();
          this.SwitchedToNextCamera = true;
        }
        break;
      case 3:
        if (o > this.LastPercentageDoneActionFired + 1 && this.TheActionHandler != null) {
          this.TheActionHandler.execute(d);
          this.LastPercentageDoneActionFired = o;
        }
        o = o % 1;
        break;
      case 4:
        o = 1;
        if (!this.bActionFired && this.TheActionHandler != null) {
          this.TheActionHandler.execute(d);
          this.bActionFired = true;
        }
        break;
    }
  } else {
    this.SwitchedToNextCamera = false;
  }
  var l = this.PathNodeToFollow.getPointOnPath(o);
  f = !l.equals(d.Pos);
  d.Pos = l;
  if (this.LookIntoMovementDirection && this.PathNodeToFollow.Nodes.length) {
    var g = o + 0.001;
    var h;
    if (this.PathNodeToFollow.IsClosedCircle) {
      h = this.PathNodeToFollow.getPointOnPath(g);
    } else {
      h = this.PathNodeToFollow.getPointOnPath(g);
    }
    if (!CL3D.iszero(h.getDistanceTo(l))) {
      var k = h.substract(l);
      k.setLength(100);
      if (this.IsCamera) {
        a = d;
        var j = l.add(k);
        f = f || !j.equals(a.Target);
        a.setTarget(j);
      } else {
        var b;
        if (!this.AdditionalRotation || this.AdditionalRotation.equalsZero()) {
          b = k.getHorizontalAngle();
          f = f || !b.equals(d.Rot);
          d.Rot = b;
        } else {
          var m = new CL3D.Matrix4;
          m.setRotationDegrees(k.getHorizontalAngle());
          var i = new CL3D.Matrix4;
          i.setRotationDegrees(this.AdditionalRotation);
          m = m.multiply(i);
          b = m.getRotationDegrees();
          f = f || !b.equals(d.Rot);
          d.Rot = b;
        }
      }
    }
  }
  return f;
};
CL3D.AnimatorFollowPath.prototype.setNode = function(a) {
  this.LastObject = a;
  if (this.LastObject) {
    this.IsCamera = this.LastObject.getType() == "camera";
  }
};
CL3D.AnimatorFollowPath.prototype.linkWithPath = function() {
  if (this.PathNodeToFollow) {
    return;
  }
  if (this.TriedToLinkWithPath) {
    return;
  }
  if (!this.PathToFollow.length) {
    return;
  }
  if (!this.Manager) {
    return;
  }
  var a = this.Manager.getSceneNodeFromName(this.PathToFollow);
  if (a && a.getType() == "path") {
    this.setPathToFollow(a);
  }
};
CL3D.AnimatorFollowPath.prototype.setPathToFollow = function(a) {
  this.PathNodeToFollow = a;
};
CL3D.AnimatorFollowPath.prototype.switchToNextCamera = function() {
  if (!this.Manager) {
    return;
  }
  if (!this.CameraToSwitchTo.length) {
    return;
  }
  var a = this.Manager.getSceneNodeFromName(this.CameraToSwitchTo);
  if (a && a.getType() == "camera") {
    var b = this.Manager.getLastUsedRenderer();
    if (b) {
      a.setAutoAspectIfNoFixedSet(b.getWidth(), b.getHeight());
    }
    this.Manager.setActiveCamera(a);
  }
};
CL3D.AnimatorFollowPath.prototype.findActionByType = function(a) {
  if (this.TheActionHandler) {
    return this.TheActionHandler.findAction(a);
  }
  return null;
};
CL3D.AnimatorFlyStraight = function(f, c, e, b, d, a) {
  this.Start = new CL3D.Vect3d(0, 0, 0);
  this.End = new CL3D.Vect3d(40, 40, 40);
  this.StartTime = CL3D.CLTimer.getTime();
  this.TimeForWay = 3E3;
  this.Loop = false;
  this.DeleteMeAfterEndReached = false;
  this.AnimateCameraTargetInsteadOfPosition = false;
  this.TestShootCollisionWithBullet = false;
  this.ShootCollisionNodeToIgnore = null;
  this.ShootCollisionDamage = 0;
  this.DeleteSceneNodeAfterEndReached = false;
  this.ActionToExecuteOnEnd = false;
  this.ExecuteActionOnEndOnlyIfTimeSmallerThen = 0;
  if (f) {
    this.Start = f.clone();
  }
  if (c) {
    this.End = c.clone();
  }
  if (e) {
    this.TimeForWay = e;
  }
  if (b) {
    this.Loop = b;
  }
  this.recalculateImidiateValues();
  if (d) {
    this.DeleteMeAfterEndReached = d;
  }
  if (a) {
    this.AnimateCameraTargetInsteadOfPosition = a;
  }
};
CL3D.AnimatorFlyStraight.prototype = new CL3D.Animator;
CL3D.AnimatorFlyStraight.prototype.getType = function() {
  return "flystraight";
};
CL3D.AnimatorFlyStraight.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorFlyStraight;
  b.Start = this.Start.clone();
  b.End = this.End.clone();
  b.Vector = this.Vector.clone();
  b.WayLength = this.WayLength;
  b.TimeFactor = this.TimeFactor;
  b.TimeForWay = this.TimeForWay;
  b.Loop = this.Loop;
  b.AnimateCameraTargetInsteadOfPosition = this.AnimateCameraTargetInsteadOfPosition;
  b.DeleteSceneNodeAfterEndReached = this.DeleteSceneNodeAfterEndReached;
  b.ActionToExecuteOnEnd = this.ActionToExecuteOnEnd ? this.ActionToExecuteOnEnd.createClone(d, e) : null;
  b.ExecuteActionOnEndOnlyIfTimeSmallerThen = this.ExecuteActionOnEndOnlyIfTimeSmallerThen;
  return b;
};
CL3D.AnimatorFlyStraight.prototype.animateNode = function(g, f) {
  var b = f - this.StartTime;
  var c = false;
  if (b != 0) {
    var e = this.Start.clone();
    if (!this.Loop && b >= this.TimeForWay) {
      e = this.End.clone();
      c = true;
    } else {
      e.addToThis(this.Vector.multiplyWithScal(b % this.TimeForWay * this.TimeFactor));
    }
    if (this.AnimateCameraTargetInsteadOfPosition) {
      if (g.getType() == "camera") {
        g.setTarget(e);
        var a = g.getAnimatorOfType("camerafps");
        if (a != null) {
          a.lookAt(e);
        }
      }
    } else {
      g.Pos = e;
    }
    if (this.TestShootCollisionWithBullet && this.StartTime != f) {
      c = this.doShootCollisionTest(g) || c;
    }
    if (c) {
      if (g.scene) {
        g.scene.LastBulletImpactPosition = g.Pos.clone();
      }
      if (this.ActionToExecuteOnEnd) {
        var d = true;
        if (this.ExecuteActionOnEndOnlyIfTimeSmallerThen > 0 && b > this.ExecuteActionOnEndOnlyIfTimeSmallerThen) {
          d = false;
        }
        if (d) {
          this.ActionToExecuteOnEnd.execute(g);
        }
      }
      if (this.DeleteMeAfterEndReached) {
        g.removeAnimator(this);
      }
      if (this.DeleteSceneNodeAfterEndReached && g.scene) {
        g.scene.addToDeletionQueue(g, 0);
      }
    }
    return true;
  }
  return false;
};
CL3D.AnimatorFlyStraight.prototype.doShootCollisionTest = function(f) {
  if (!f) {
    return false;
  }
  f.updateAbsolutePosition();
  var c = f.getTransformedBoundingBox();
  var e = false;
  var a = f.scene.getAllSceneNodesWithAnimator("gameai");
  for (var b = 0;b < a.length;++b) {
    if (a[b] === this.ShootCollisionNodeToIgnore) {
      continue;
    }
    var d = a[b].getAnimatorOfType("gameai");
    if (d && !d.isAlive()) {
      continue;
    }
    if (c.intersectsWithBox(a[b].getTransformedBoundingBox())) {
      d.OnHit(this.ShootCollisionDamage, a[b]);
      e = true;
      break;
    }
  }
  return e;
};
CL3D.AnimatorFlyStraight.prototype.recalculateImidiateValues = function() {
  this.Vector = this.End.substract(this.Start);
  this.WayLength = this.Vector.getLength();
  this.Vector.normalize();
  this.TimeFactor = this.WayLength / this.TimeForWay;
};
CL3D.AnimatorFlyCircle = function(b, a, d, c) {
  this.Center = new CL3D.Vect3d;
  this.Direction = new CL3D.Vect3d(0, 1, 0);
  this.VecU = new CL3D.Vect3d;
  this.VecV = new CL3D.Vect3d;
  this.StartTime = CL3D.CLTimer.getTime();
  this.Speed = 0.01;
  this.Radius = 100;
  if (b) {
    this.Center = b.clone();
  }
  if (a) {
    this.Radius = a;
  }
  if (d) {
    this.Direction = d.clone();
  }
  if (c) {
    this.Speed = c;
  }
  this.init();
};
CL3D.AnimatorFlyCircle.prototype = new CL3D.Animator;
CL3D.AnimatorFlyCircle.prototype.getType = function() {
  return "flycircle";
};
CL3D.AnimatorFlyCircle.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorFlyCircle;
  b.Center = this.Center.clone();
  b.Direction = this.Direction.clone();
  b.VecU = this.VecU.clone();
  b.VecV = this.VecV.clone();
  b.Speed = this.Speed;
  b.Radius = this.Radius;
  return b;
};
CL3D.AnimatorFlyCircle.prototype.animateNode = function(e, d) {
  var c = d - this.StartTime;
  if (c != 0) {
    var b = c * this.Speed;
    var a = this.VecU.multiplyWithScal(Math.cos(b)).add(this.VecV.multiplyWithScal(Math.sin(b)));
    a.multiplyThisWithScal(this.Radius);
    e.Pos = this.Center.add(a);
    return true;
  }
  return false;
};
CL3D.AnimatorFlyCircle.prototype.init = function() {
  this.Direction.normalize();
  if (this.Direction.Y != 0) {
    this.VecV = new CL3D.Vect3d(50, 0, 0);
    this.VecV = this.VecV.crossProduct(this.Direction);
    this.VecV.normalize();
  } else {
    this.VecV = new CL3D.Vect3d(0, 50, 0);
    this.VecV = this.VecV.crossProduct(this.Direction);
    this.VecV.normalize();
  }
  this.VecU = this.VecV.crossProduct(this.Direction);
  this.VecU.normalize();
};
CL3D.AnimatorRotation = function(a) {
  this.Rotation = new CL3D.Vect3d;
  if (a) {
    this.Rotation = a.clone();
  }
  this.StartTime = CL3D.CLTimer.getTime();
  this.RotateToTargetAndStop = false;
  this.RotateToTargetEndTime = 0;
  this.BeginRotation = null;
};
CL3D.AnimatorRotation.prototype = new CL3D.Animator;
CL3D.AnimatorRotation.prototype.getType = function() {
  return "rotation";
};
CL3D.AnimatorRotation.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorRotation(this.SMGr, this.engine);
  b.Rotation = this.Rotation.clone();
  b.StartTime = this.StartTime;
  return b;
};
CL3D.AnimatorRotation.prototype.animateNode = function(g, f) {
  var c = f - this.StartTime;
  if (!this.RotateToTargetAndStop) {
    if (c != 0) {
      g.Rot.addToThis(this.Rotation.multiplyWithScal(c / 10));
      this.StartTime = f;
      return true;
    }
  } else {
    if (this.RotateToTargetEndTime - this.StartTime == 0) {
      return false;
    }
    var e = (f - this.StartTime) / (this.RotateToTargetEndTime - this.StartTime);
    if (e > 1) {
      g.removeAnimator(this);
    } else {
      var a = new CL3D.Quaternion;
      var b = this.Rotation.multiplyWithScal(CL3D.DEGTORAD);
      a.setFromEuler(b.X, b.Y, b.Z);
      var d = new CL3D.Quaternion;
      b = this.BeginRotation.multiplyWithScal(CL3D.DEGTORAD);
      d.setFromEuler(b.X, b.Y, b.Z);
      d.slerp(d, a, e);
      b = new CL3D.Vect3d;
      d.toEuler(b);
      b.multiplyThisWithScal(CL3D.RADTODEG);
      g.Rot = b;
      return true;
    }
  }
  return false;
};
CL3D.AnimatorRotation.prototype.setRotateToTargetAndStop = function(b, a, c) {
  this.RotateToTargetAndStop = true;
  this.Rotation = b.clone();
  this.BeginRotation = a.clone();
  this.RotateToTargetEndTime = this.StartTime + c;
};
CL3D.AnimatorAnimateTexture = function(a, c, b) {
  this.Textures = new Array;
  this.Loop = true;
  this.TimePerFrame = 20;
  this.TextureChangeType = 0;
  this.TextureIndexToChange = 0;
  this.MyStartTime = 0;
  if (a) {
    this.Textures = a;
  }
  if (c) {
    this.TimePerFrame = c;
  }
  if (b == true) {
    this.loop = false;
  }
};
CL3D.AnimatorAnimateTexture.prototype = new CL3D.Animator;
CL3D.AnimatorAnimateTexture.prototype.getType = function() {
  return "animatetexture";
};
CL3D.AnimatorAnimateTexture.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorAnimateTexture;
  b.Textures = this.Textures;
  b.Loop = this.Loop;
  b.TimePerFrame = this.TimePerFrame;
  b.TextureChangeType = this.TextureChangeType;
  b.TextureIndexToChange = this.TextureIndexToChange;
  return b;
};
CL3D.AnimatorAnimateTexture.prototype.animateNode = function(c, a) {
  if (c == null || this.Textures == null) {
    return false;
  }
  var d = false;
  var h = null;
  if (this.Textures.length) {
    var b = this.MyStartTime == 0 ? c.scene.getStartTime() : this.MyStartTime;
    var j = a - b;
    var f = b + this.TimePerFrame * this.Textures.length;
    var g = 0;
    if (!this.Loop && a >= f) {
      g = this.Textures.length - 1;
    } else {
      if (this.TimePerFrame > 0) {
        g = Math.floor(j / this.TimePerFrame % this.Textures.length);
      } else {
        g = 0;
      }
    }
    if (g < this.Textures.length) {
      if (this.TextureChangeType == 1) {
        if (this.TextureIndexToChange >= 0 && this.TextureIndexToChange < c.getMaterialCount()) {
          h = c.getMaterial(this.TextureIndexToChange);
          if (h && !(h.Tex1 === this.Textures[g])) {
            h.Tex1 = this.Textures[g];
            d = true;
          }
        }
      } else {
        var k = c.getMaterialCount();
        for (var e = 0;e < k;++e) {
          h = c.getMaterial(e);
          if (h && !(h.Tex1 === this.Textures[g])) {
            h.Tex1 = this.Textures[g];
            d = true;
          }
        }
      }
    }
  }
  return d;
};
CL3D.AnimatorAnimateTexture.prototype.reset = function() {
  this.MyStartTime = CL3D.CLTimer.getTime();
};
CL3D.AnimatorOnClick = function(d, c, a, b) {
  this.engine = c;
  this.TimeLastClicked = 0;
  this.PositionClickedX = -1;
  this.PositionClickedY = -1;
  this.Registered = false;
  this.LastUsedSceneNode = null;
  this.SMGr = d;
  this.FunctionToCall = a;
  this.BoundingBoxTestOnly = true;
  this.CollidesWithWorld = false;
  this.TheActionHandler = null;
  this.World = null;
  if (!(b == true)) {
    d.registerSceneNodeAnimatorForEvents(this);
  }
};
CL3D.AnimatorOnClick.prototype = new CL3D.Animator;
CL3D.AnimatorOnClick.prototype.getType = function() {
  return "onclick";
};
CL3D.AnimatorOnClick.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorOnClick(this.SMGr, this.engine);
  b.BoundingBoxTestOnly = this.BoundingBoxTestOnly;
  b.CollidesWithWorld = this.CollidesWithWorld;
  b.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(d, e) : null;
  b.World = this.World;
  return b;
};
CL3D.AnimatorOnClick.prototype.animateNode = function(d, c) {
  if (d == null) {
    return false;
  }
  if (this.TimeLastClicked) {
    var a = CL3D.CLTimer.getTime();
    var b = a - this.TimeLastClicked;
    if (b < 1500) {
      this.TimeLastClicked = 0;
      if (a - this.engine.LastCameraDragTime < 250) {
        return false;
      }
      if (d.Visible && this.isOverNode(d, this.PositionClickedX, this.PositionClickedY)) {
        if (this.FunctionToCall) {
          this.FunctionToCall();
        }
        this.invokeAction(d);
        return true;
      }
    }
  }
  return false;
};
CL3D.AnimatorOnClick.prototype.onMouseUp = function(a) {
  this.PositionClickedX = this.engine.getMousePosXFromEvent(a);
  this.PositionClickedY = this.engine.getMousePosYFromEvent(a);
  this.TimeLastClicked = CL3D.CLTimer.getTime();
};
CL3D.AnimatorOnClick.prototype.invokeAction = function(a) {
  if (this.TheActionHandler) {
    this.TheActionHandler.execute(a);
  }
};
CL3D.AnimatorOnClick.prototype.isOverNode = function(g, f, d) {
  if (g == null) {
    return false;
  }
  if (g.getType() == "2doverlay") {
    var e = g.getScreenCoordinatesRect(false, this.engine.getRenderer());
    if (e.x <= f && (e.y <= d && (e.x + e.w >= f && e.y + e.h >= d))) {
      return true;
    }
  }
  var b = this.engine.get3DPositionFrom2DPosition(f, d);
  if (b == null) {
    return false;
  }
  var h = this.SMGr.getActiveCamera();
  if (h == null) {
    return false;
  }
  var c = h.getAbsolutePosition();
  var a = new CL3D.Line3d;
  a.Start = c;
  a.End = b;
  return this.static_getCollisionDistanceWithNode(this.SMGr, g, a, this.BoundingBoxTestOnly, this.CollidesWithWorld, this.World, null);
};
CL3D.AnimatorOnClick.prototype.static_getDistanceToNearestCollisionPointWithWorld = function(d, e, b, g, c) {
  var f = 999999999999;
  if (!g || !d) {
    return f;
  }
  var a = g.getCollisionPointWithLine(e, b, true, null, c);
  if (a) {
    return e.getDistanceTo(a);
  }
  return f;
};
CL3D.AnimatorOnClick.prototype.getDistanceToNearestCollisionPointWithWorld = function(b, a) {
  return this.static_getDistanceToNearestCollisionPointWithWorld(this.SMGr, b, a, this.World, true);
};
CL3D.AnimatorOnClick.prototype.static_getCollisionDistanceWithNode = function(b, k, h, e, f, j, l) {
  var g = k.getBoundingBox();
  var d = 0;
  var r = new CL3D.Matrix4(false);
  if (k.AbsoluteTransformation.getInverse(r)) {
    if (g.intersectsWithLine(r.getTransformedVect(h.Start), r.getTransformedVect(h.End))) {
      var q = null;
      if (k.getMesh && k.OwnedMesh) {
        q = k;
      }
      var o = q == null || e;
      if (!o) {
        var m = q.Selector;
        if (m == null) {
          if (q.OwnedMesh && q.OwnedMesh.GetPolyCount() > 100) {
            m = new CL3D.OctTreeTriangleSelector(q.OwnedMesh, q, 0);
          } else {
            m = new CL3D.MeshTriangleSelector(q.OwnedMesh, q);
          }
          q.Selector = m;
        }
        if (m) {
          var c = m.getCollisionPointWithLine(h.Start, h.End, true, null, true);
          if (c != null) {
            if (f) {
              d = this.static_getDistanceToNearestCollisionPointWithWorld(b, h.Start, c, j, true);
              var a = c.getDistanceTo(h.Start);
              if (d + CL3D.TOLERANCE < a) {
                return false;
              } else {
                if (l != null) {
                  l.N = c.getDistanceTo(h.Start);
                }
                return true;
              }
            } else {
              if (l != null) {
                l.N = h.Start.getDistanceTo(k.getTransformedBoundingBox().getCenter());
              }
              return true;
            }
          }
        } else {
          o = true;
        }
      }
      if (o) {
        if (!f) {
          if (l != null) {
            l.N = h.Start.getDistanceTo(k.getTransformedBoundingBox().getCenter());
          }
          return true;
        } else {
          var u = h.Start.clone();
          g = k.getTransformedBoundingBox();
          var t = g.getExtent();
          t.multiplyThisWithScal(0.5);
          var p = CL3D.max3(t.X, t.Y, t.Z);
          p = Math.sqrt(p * p + p * p);
          var n = k.getTransformedBoundingBox().getCenter();
          d = this.static_getDistanceToNearestCollisionPointWithWorld(b, u, n, j, true);
          var i = n.getDistanceTo(u) - p;
          if (d < i) {
            return false;
          } else {
            if (l != null) {
              l.N = i;
            }
            return true;
          }
        }
      }
    }
  }
  return false;
};
CL3D.AnimatorOnClick.prototype.findActionByType = function(a) {
  if (this.TheActionHandler) {
    return this.TheActionHandler.findAction(a);
  }
  return null;
};
CL3D.AnimatorOnMove = function(b, a) {
  this.engine = a;
  this.SMGr = b;
  this.ActionHandlerOnEnter = null;
  this.ActionHandlerOnLeave = null;
  this.TimeLastChecked = 0;
  this.bLastTimeWasInside = 0;
};
CL3D.AnimatorOnMove.prototype = new CL3D.AnimatorOnClick(null, null, null, true);
CL3D.AnimatorOnMove.prototype.getType = function() {
  return "onmove";
};
CL3D.AnimatorOnMove.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorOnMove(this.SMGr, this.engine);
  b.BoundingBoxTestOnly = this.BoundingBoxTestOnly;
  b.CollidesWithWorld = this.CollidesWithWorld;
  b.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(d, e) : null;
  b.World = this.World;
  b.ActionHandlerOnEnter = this.ActionHandlerOnEnter ? this.ActionHandlerOnEnter.createClone(d, e) : null;
  b.ActionHandlerOnLeave = this.ActionHandlerOnLeave ? this.ActionHandlerOnLeave.createClone(d, e) : null;
  return b;
};
CL3D.AnimatorOnMove.prototype.animateNode = function(b, e) {
  var d = this.TimeLastChecked == 0;
  var a = CL3D.CLTimer.getTime();
  if (d || a - this.TimeLastChecked > 100) {
    this.TimeLastChecked = a;
    var c = this.isOverNode(b, this.engine.getMouseX(), this.engine.getMouseY());
    if (d) {
      this.bLastTimeWasInside = c;
    } else {
      if (c != this.bLastTimeWasInside) {
        this.bLastTimeWasInside = c;
        if (c && this.ActionHandlerOnEnter) {
          this.ActionHandlerOnEnter.execute(b);
        } else {
          if (!c && this.ActionHandlerOnLeave) {
            this.ActionHandlerOnLeave.execute(b);
          }
        }
        return true;
      }
    }
  }
  return false;
};
CL3D.AnimatorOnMove.prototype.findActionByType = function(b) {
  var a = null;
  if (this.ActionHandlerOnLeave) {
    a = this.ActionHandlerOnLeave.findAction(b);
    if (a) {
      return a;
    }
  }
  if (this.ActionHandlerOnEnter) {
    a = this.ActionHandlerOnEnter.findAction(b);
    if (a) {
      return a;
    }
  }
  return null;
};
CL3D.AnimatorOnProximity = function(e, c, b, d, a) {
  this.TimeLastClicked = 0;
  this.sceneManager = e;
  this.EnterType = 0;
  this.ProximityType = 0;
  this.Range = 0;
  this.SceneNodeToTest = 0;
  this.TheActionHandler = null;
  this.FunctionToCall = d;
  if (c) {
    this.Radius = c;
  }
  if (b) {
    this.SceneNodeToTest = b;
  }
  if (a) {
    this.EnterType = 1;
  }
  this.IsInsideRadius = false;
};
CL3D.AnimatorOnProximity.prototype = new CL3D.Animator;
CL3D.AnimatorOnProximity.prototype.getType = function() {
  return "oncollide";
};
CL3D.AnimatorOnProximity.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorOnProximity(this.sceneManager);
  b.EnterType = this.EnterType;
  b.ProximityType = this.ProximityType;
  b.Range = this.Range;
  b.SceneNodeToTest = this.SceneNodeToTest;
  b.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(d, e) : null;
  return b;
};
CL3D.AnimatorOnProximity.prototype.animateNode = function(g, f) {
  if (g == null || this.sceneManager == null) {
    return false;
  }
  var e = false;
  var a = null;
  if (this.ProximityType == 0) {
    a = this.sceneManager.getActiveCamera();
  } else {
    if (this.SceneNodeToTest != -1) {
      a = this.sceneManager.getSceneNodeFromId(this.SceneNodeToTest);
    }
  }
  if (a) {
    if (g === a) {
      return false;
    }
    var c = a.getAbsolutePosition();
    var b = g.getAbsolutePosition();
    var d = c.getDistanceTo(b) < this.Range;
    switch(this.EnterType) {
      case 0:
        if (d && !this.IsInsideRadius) {
          this.invokeAction(a);
          e = true;
        }
        break;
      case 1:
        if (!d && this.IsInsideRadius) {
          this.invokeAction(a);
          e = true;
        }
        break;
    }
    this.IsInsideRadius = d;
  }
  return e;
};
CL3D.AnimatorOnProximity.prototype.invokeAction = function(a) {
  if (this.FunctionToCall) {
    this.FunctionToCall.call(a);
  }
  if (this.TheActionHandler) {
    this.TheActionHandler.execute(a);
  }
};
CL3D.AnimatorOnProximity.prototype.findActionByType = function(a) {
  if (this.TheActionHandler) {
    return this.TheActionHandler.findAction(a);
  }
  return null;
};
CL3D.AnimatorCollisionResponse = function(a, e, d, c, b) {
  this.Radius = a;
  this.Gravity = e;
  this.Translation = d;
  this.World = c;
  this.SlidingSpeed = b;
  this.UseFixedSlidingSpeed = false;
  this.Node = null;
  this.LastAnimationTime = null;
  this.LastPosition = new CL3D.Vect3d(0, 0, 0);
  this.Falling = false;
  this.FallStartTime = 0;
  this.JumpForce = 0;
  this.UseInclination = false;
  if (this.Gravity == null) {
    this.Gravity = new CL3D.Vect3d(0, 1, 0);
  }
  if (this.Radius == null) {
    this.Radius = new CL3D.Vect3d(30, 50, 30);
  }
  if (this.Translation == null) {
    this.Translation = new CL3D.Vect3d(0, 0, 0);
  }
  if (this.SlidingSpeed == null) {
    this.SlidingSpeed = 5E-4;
  }
  this.reset();
};
CL3D.AnimatorCollisionResponse.prototype = new CL3D.Animator;
CL3D.AnimatorCollisionResponse.prototype.getType = function() {
  return "collisionresponse";
};
CL3D.AnimatorCollisionResponse.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorCollisionResponse;
  b.Radius = this.Radius.clone();
  b.Gravity = this.Gravity.clone();
  b.Translation = this.Translation.clone();
  b.LastPosition = this.LastPosition.clone();
  b.UseInclination = this.UseInclination;
  b.World = this.World;
  return b;
};
CL3D.AnimatorCollisionResponse.prototype.reset = function() {
  this.Node = null;
  this.LastAnimationTime = CL3D.CLTimer.getTime();
};
CL3D.AnimatorCollisionResponse.prototype.setWorld = function(a) {
  this.World = a;
};
CL3D.AnimatorCollisionResponse.prototype.getWorld = function() {
  return this.World;
};
CL3D.AnimatorCollisionResponse.prototype.setGravity = function(a) {
  this.Gravity = a;
};
CL3D.AnimatorCollisionResponse.prototype.getGravity = function() {
  return this.Gravity;
};
CL3D.AnimatorCollisionResponse.prototype.isFalling = function() {
  return this.Falling;
};
CL3D.AnimatorCollisionResponse.prototype.animateNode = function(l, w) {
  var v = w - this.LastAnimationTime;
  if (!this.World) {
    return false;
  }
  if (v > 150) {
    v = 150;
  }
  this.LastAnimationTime = w;
  if (!(this.Node === l)) {
    this.Node = l;
    this.LastPosition = l.Pos.clone();
  }
  var e = l.Pos.clone();
  var h = l.Pos.substract(this.LastPosition);
  var m = this.Gravity.multiplyWithScal(v);
  if (!this.Falling) {
    m.multiplyThisWithScal(0.001);
  } else {
    var b = (w - this.FallStartTime) / 1E3;
    if (b > 5) {
      b = 5;
    }
    m.multiplyThisWithScal(b);
  }
  if (this.JumpForce > 0) {
    var u = this.Gravity.multiplyWithScal(v * this.JumpForce * 0.001);
    m.substractFromThis(u);
    this.JumpForce -= v;
    if (this.JumpForce < 0) {
      this.JumpForce = 0;
    }
  }
  var c = h.add(m);
  if (!c.equalsZero()) {
    if (!this.UseFixedSlidingSpeed) {
      this.SlidingSpeed = this.Radius.getLength() * 1E-6;
    }
    var k = null;
    if (l && l.getType() == "camera") {
      k = l;
    }
    var r;
    if (k) {
      r = k.Target.substract(k.Pos);
    }
    var q = new CL3D.Triangle3d;
    var t = new Object;
    t.N = 0;
    this.World.setNodeToIgnore(l);
    e = this.getCollisionResultPosition(this.World, this.LastPosition.substract(this.Translation), this.Radius, h, q, t, this.SlidingSpeed, m);
    this.World.setNodeToIgnore(null);
    e.addToThis(this.Translation);
    if (t.N < 0.5) {
      this.Falling = false;
    } else {
      if (!this.Falling) {
        this.FallStartTime = w;
      }
      this.Falling = true;
    }
    if (l.Pos.equals(e)) {
      return false;
    }
    l.Pos = e.clone();
    if (this.UseInclination) {
      if (!this.Falling) {
        if (!(q.pointA.equalsZero() && (q.pointB.equalsZero() && q.pointC.equalsZero()))) {
          var j = l.Rot.Y;
          var x = q.pointA.add(q.pointB).add(q.pointC);
          x.multiplyThisWithScal(1 / 3);
          q.pointA.X -= x.X;
          q.pointA.Z -= x.Z;
          q.pointB.X -= x.X;
          q.pointB.Z -= x.Z;
          q.pointC.X -= x.X;
          q.pointC.Z -= x.Z;
          q.pointA.rotateXZBy(j);
          q.pointB.rotateXZBy(j);
          q.pointC.rotateXZBy(j);
          q.pointA.X += x.X;
          q.pointA.Z += x.Z;
          q.pointB.X += x.X;
          q.pointB.Z += x.Z;
          q.pointC.X += x.X;
          q.pointC.Z += x.Z;
          var g = q.getNormal();
          var o = new CL3D.Vect3d;
          o.X = Math.atan2(g.Z, g.Y) * CL3D.RADTODEG;
          o.Y = l.Rot.Y;
          o.Z = -Math.atan2(g.X, g.Y) * CL3D.RADTODEG;
          l.Rot = o;
        }
      }
    }
    if (k && r) {
      var f = true;
      for (var p = 0;p < l.Animators.length;++p) {
        var y = l.Animators[p];
        if (y && y.getType() == "cameramodelviewer") {
          f = false;
          break;
        }
      }
      if (f) {
        k.Target = l.Pos.add(r);
      }
    }
  }
  var d = this.LastPosition.equals(l.Pos);
  this.LastPosition = l.Pos.clone();
  return false;
};
CL3D.AnimatorCollisionResponse.prototype.getCollisionResultPosition = function(c, e, h, d, j, g, b, m) {
  if (!c || (h.X == 0 || (h.Y == 0 || h.Z == 0))) {
    return e;
  }
  var a = new Object;
  a.R3Position = e.clone();
  a.R3Velocity = d.clone();
  a.eRadius = h.clone();
  a.nearestDistance = 9.99999999E7;
  a.selector = c;
  a.slidingSpeed = b;
  a.triangleHits = 0;
  a.intersectionPoint = new CL3D.Vect3d;
  var k = a.R3Position.divideThroughVect(a.eRadius);
  var l = a.R3Velocity.divideThroughVect(a.eRadius);
  var f = this.collideWithWorld(0, a, k, l);
  g.N = 0;
  if (!m.equalsZero()) {
    a.R3Position = f.multiplyWithVect(a.eRadius);
    a.R3Velocity = m.clone();
    a.triangleHits = 0;
    l = m.divideThroughVect(a.eRadius);
    f = this.collideWithWorld(0, a, f, l);
    g.N = a.triangleHits == 0 ? 1 : 0;
    if (g.N < 0.5 && a.intersectionTriangle) {
      var i = a.intersectionTriangle.getNormal();
      i.normalize();
      if (!(Math.abs(i.Y) > Math.abs(i.X) && Math.abs(i.Y) > Math.abs(i.Z))) {
        g.N = 1;
      }
    }
  }
  if (a.triangleHits && j != null) {
    j.pointA = a.intersectionTriangle.pointA.clone();
    j.pointB = a.intersectionTriangle.pointB.clone();
    j.pointC = a.intersectionTriangle.pointC.clone();
    j.pointA.multiplyThisWithVect(a.eRadius);
    j.pointB.multiplyThisWithVect(a.eRadius);
    j.pointC.multiplyThisWithVect(a.eRadius);
  }
  f.multiplyThisWithVect(a.eRadius);
  return f;
};
CL3D.AnimatorCollisionResponse.prototype.collideWithWorld = function(a, k, c, e) {
  var p = k.slidingSpeed;
  if (a > 5) {
    var d = e.clone();
    d.setLength(p);
    return c.add(d);
  }
  k.velocity = e.clone();
  k.normalizedVelocity = e.clone();
  k.normalizedVelocity.normalize();
  k.basePoint = c.clone();
  k.foundCollision = false;
  k.nearestDistance = 9.99999999E7;
  var g = new CL3D.Box3d;
  k.R3Position.copyTo(g.MinEdge);
  k.R3Position.copyTo(g.MaxEdge);
  g.addInternalPointByVector(k.R3Position.add(k.R3Velocity));
  g.MinEdge.substractFromThis(k.eRadius);
  g.MaxEdge.addToThis(k.eRadius);
  var o = new Array;
  var b = new CL3D.Matrix4;
  b.setScaleXYZ(1 / k.eRadius.X, 1 / k.eRadius.Y, 1 / k.eRadius.Z);
  k.selector.getTrianglesInBox(g, b, o);
  for (var r = 0;r < o.length;++r) {
    this.testTriangleIntersection(k, o[r]);
  }
  if (!k.foundCollision) {
    return c.add(e);
  }
  var l = c.add(e);
  var j = c.clone();
  if (k.nearestDistance >= p) {
    var h = e.clone();
    h.setLength(k.nearestDistance - p);
    j = k.basePoint.add(h);
    h.normalize();
    k.intersectionPoint.substractFromThis(h.multiplyWithScal(p));
  }
  var n = k.intersectionPoint.clone();
  var m = j.substract(k.intersectionPoint);
  m.normalize();
  var f = new CL3D.Plane3d;
  f.setPlane(n, m);
  var t = l.substract(m.multiplyWithScal(f.getDistanceTo(l)));
  var q = t.substract(k.intersectionPoint);
  if (q.getLength() < p) {
    return j;
  }
  return this.collideWithWorld(a + 1, k, j, q);
};
CL3D.AnimatorCollisionResponse.prototype.testTriangleIntersection = function(u, z) {
  var v = z.getPlane();
  if (!v.isFrontFacing(u.normalizedVelocity)) {
    return;
  }
  var n = 0;
  var p = 0;
  var j = false;
  var A = 0;
  var o = v.getDistanceTo(u.basePoint);
  var G = v.Normal.dotProduct(u.velocity);
  if (CL3D.iszero(G)) {
    if (Math.abs(o) >= 1) {
      return;
    } else {
      j = true;
      p = 0;
      n = 1;
    }
  } else {
    G = 1 / G;
    p = (-1 - o) * G;
    n = (1 - o) * G;
    if (p > n) {
      var C = n;
      n = p;
      p = C;
    }
    if (p > 1 || n < 0) {
      return;
    }
    p = CL3D.clamp(p, 0, 1);
    n = CL3D.clamp(n, 0, 1);
  }
  var d = new CL3D.Vect3d;
  var k = false;
  var r = 1;
  if (!j) {
    var w = u.basePoint.substract(v.Normal).add(u.velocity.multiplyWithScal(p));
    if (z.isPointInsideFast(w)) {
      k = true;
      r = p;
      d = w.clone();
    }
  }
  if (!k) {
    var l = u.velocity.clone();
    var g = u.basePoint.clone();
    var y = l.getLengthSQ();
    var F = 0;
    var D = 0;
    var B = 0;
    var q = new Object;
    q.N = 0;
    F = y;
    D = 2 * l.dotProduct(g.substract(z.pointA));
    B = z.pointA.substract(g).getLengthSQ() - 1;
    if (this.getLowestRoot(F, D, B, r, q)) {
      r = q.N;
      k = true;
      d = z.pointA.clone();
    }
    if (!k) {
      D = 2 * l.dotProduct(g.substract(z.pointB));
      B = z.pointB.substract(g).getLengthSQ() - 1;
      if (this.getLowestRoot(F, D, B, r, q)) {
        r = q.N;
        k = true;
        d = z.pointB.clone();
      }
    }
    if (!k) {
      D = 2 * l.dotProduct(g.substract(z.pointC));
      B = z.pointC.substract(g).getLengthSQ() - 1;
      if (this.getLowestRoot(F, D, B, r, q)) {
        r = q.N;
        k = true;
        d = z.pointC.clone();
      }
    }
    var i = z.pointB.substract(z.pointA);
    var x = z.pointA.substract(g);
    var m = i.getLengthSQ();
    var h = i.dotProduct(l);
    var e = i.dotProduct(x);
    F = m * -y + h * h;
    D = m * (2 * l.dotProduct(x)) - 2 * h * e;
    B = m * (1 - x.getLengthSQ()) + e * e;
    if (this.getLowestRoot(F, D, B, r, q)) {
      A = (h * q.N - e) / m;
      if (A >= 0 && A <= 1) {
        r = q.N;
        k = true;
        d = z.pointA.add(i.multiplyWithScal(A));
      }
    }
    i = z.pointC.substract(z.pointB);
    x = z.pointB.substract(g);
    m = i.getLengthSQ();
    h = i.dotProduct(l);
    e = i.dotProduct(x);
    F = m * -y + h * h;
    D = m * (2 * l.dotProduct(x)) - 2 * h * e;
    B = m * (1 - x.getLengthSQ()) + e * e;
    if (this.getLowestRoot(F, D, B, r, q)) {
      A = (h * q.N - e) / m;
      if (A >= 0 && A <= 1) {
        r = q.N;
        k = true;
        d = z.pointB.add(i.multiplyWithScal(A));
      }
    }
    i = z.pointA.substract(z.pointC);
    x = z.pointC.substract(g);
    m = i.getLengthSQ();
    h = i.dotProduct(l);
    e = i.dotProduct(x);
    F = m * -y + h * h;
    D = m * (2 * l.dotProduct(x)) - 2 * h * e;
    B = m * (1 - x.getLengthSQ()) + e * e;
    if (this.getLowestRoot(F, D, B, r, q)) {
      A = (h * q.N - e) / m;
      if (A >= 0 && A <= 1) {
        r = q.N;
        k = true;
        d = z.pointC.add(i.multiplyWithScal(A));
      }
    }
  }
  if (k) {
    var E = r * u.velocity.getLength();
    if (!u.foundCollision || E < u.nearestDistance) {
      u.nearestDistance = E;
      u.intersectionPoint = d.clone();
      u.foundCollision = true;
      u.intersectionTriangle = z;
      ++u.triangleHits;
    }
  }
};
CL3D.AnimatorCollisionResponse.prototype.getLowestRoot = function(l, k, i, g, d) {
  var j = k * k - 4 * l * i;
  if (j < 0) {
    return false;
  }
  var m = Math.sqrt(j);
  var f = (-k - m) / (2 * l);
  var e = (-k + m) / (2 * l);
  if (f > e) {
    var h = e;
    e = f;
    f = h;
  }
  if (f > 0 && f < g) {
    d.N = f;
    return true;
  }
  if (e > 0 && e < g) {
    d.N = e;
    return true;
  }
  return false;
};
CL3D.AnimatorCollisionResponse.prototype.jump = function(a) {
  if (this.JumpForce == 0) {
    this.JumpForce = a * 100;
  }
};
CL3D.AnimatorTimer = function(a) {
  this.TimeLastTimed = 0;
  this.SMGr = a;
  this.TheActionHandler = null;
  this.TickEverySeconds = 0;
  this.TimeLastTimed = CL3D.CLTimer.getTime();
};
CL3D.AnimatorTimer.prototype = new CL3D.Animator;
CL3D.AnimatorTimer.prototype.getType = function() {
  return "timer";
};
CL3D.AnimatorTimer.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorTimer(this.SMGr);
  b.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(d, e) : null;
  b.TimeLastTimed = this.TimeLastTimed;
  b.TickEverySeconds = this.TickEverySeconds;
  return b;
};
CL3D.AnimatorTimer.prototype.animateNode = function(c, b) {
  if (c == null) {
    return false;
  }
  if (this.TickEverySeconds > 0) {
    var a = CL3D.CLTimer.getTime();
    if (a - this.TimeLastTimed > this.TickEverySeconds) {
      this.TimeLastTimed = a;
      if (this.TheActionHandler) {
        this.TheActionHandler.execute(c);
      }
      return true;
    }
  }
  return false;
};
CL3D.AnimatorOnKeyPress = function(b, a) {
  this.SMGr = b;
  this.Engine = a;
  this.TheActionHandler = null;
  this.TickEverySeconds = 0;
  this.TimeLastPressed = 0;
  a.registerAnimatorForKeyUp(this);
  a.registerAnimatorForKeyDown(this);
  b.registerSceneNodeAnimatorForEvents(this);
};
CL3D.AnimatorOnKeyPress.prototype = new CL3D.Animator;
CL3D.AnimatorOnKeyPress.prototype.getType = function() {
  return "keypress";
};
CL3D.AnimatorOnKeyPress.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorOnKeyPress(this.SMGr, this.Engine);
  b.KeyPressType = this.KeyPressType;
  b.KeyCode = this.KeyCode;
  b.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(d, e) : null;
  return b;
};
CL3D.AnimatorOnKeyPress.prototype.animateNode = function(d, c) {
  if (d == null) {
    return false;
  }
  if (this.TimeLastPressed) {
    var a = CL3D.CLTimer.getTime();
    var b = a - this.TimeLastPressed;
    if (b < 1E3) {
      this.TimeLastPressed = 0;
      if (this.TheActionHandler) {
        this.TheActionHandler.execute(d);
      }
      return true;
    }
  }
  return false;
};
CL3D.AnimatorOnKeyPress.prototype.onKeyDown = function(a) {
  if (this.KeyPressType == 0 && a.keyCode == this.KeyCode) {
    this.TimeLastPressed = CL3D.CLTimer.getTime();
    return true;
  }
  return false;
};
CL3D.AnimatorOnKeyPress.prototype.onKeyUp = function(a) {
  if (this.KeyPressType == 1 && a.keyCode == this.KeyCode) {
    this.TimeLastPressed = CL3D.CLTimer.getTime();
    return true;
  }
  return false;
};
CL3D.AnimatorOnKeyPress.prototype.onMouseUp = function(a) {
  if (this.KeyPressType == 1) {
    if (a.button > 1 && this.KeyCode == 2) {
      this.TimeLastPressed = CL3D.CLTimer.getTime();
    } else {
      if (a.button <= 1 && this.KeyCode == 1) {
        this.TimeLastPressed = CL3D.CLTimer.getTime();
      }
    }
  }
};
CL3D.AnimatorOnKeyPress.prototype.onMouseDown = function(a) {
  if (this.KeyPressType == 0) {
    if (a.button > 1 && this.KeyCode == 2) {
      this.TimeLastPressed = CL3D.CLTimer.getTime();
    } else {
      if (a.button <= 1 && this.KeyCode == 1) {
        this.TimeLastPressed = CL3D.CLTimer.getTime();
      }
    }
  }
};
CL3D.AnimatorOnKeyPress.prototype.findActionByType = function(a) {
  if (this.TheActionHandler) {
    return this.TheActionHandler.findAction(a);
  }
  return null;
};
CL3D.AnimatorGameAI = function(b, a) {
  this.AIType = 0;
  this.MovementSpeed = 0;
  this.ActivationRadius = 0;
  this.CanFly = false;
  this.Health = 100;
  this.PatrolWaitTimeMs = 3E3;
  this.PathIdToFollow = -1;
  this.Tags = "";
  this.AttacksAIWithTags = "";
  this.PatrolRadius = 100;
  this.RotationSpeedMs = 0;
  this.AdditionalRotationForLooking = new CL3D.Vect3d;
  this.StandAnimation = "";
  this.WalkAnimation = "";
  this.DieAnimation = "";
  this.AttackAnimation = "";
  this.ActionHandlerOnAttack = null;
  this.ActionHandlerOnActivate = null;
  this.ActionHandlerOnHit = null;
  this.ActionHandlerOnDie = null;
  this.CurrentCommand = 0;
  this.NextAttackTargetScanTime = 0;
  this.LastPatrolStartTime = 0;
  this.CurrentCommandTargetPos = null;
  this.CurrentCommandStartTime = 0;
  this.CurrentCommandTicksDone = 0;
  this.CurrentCommandExpectedTickCount = 0;
  this.BeginPositionWhenStartingCurrentCommand = 0;
  this.HandleCurrentCommandTargetNode = null;
  this.AttackCommandExecuted = false;
  this.Activated = false;
  this.CurrentlyShooting = false;
  this.CurrentlyShootingLine = new CL3D.Line3d;
  this.NextPathPointToGoTo = 0;
  this.World = null;
  this.TheObject = null;
  this.TheSceneManager = b;
  this.LastTime = 0;
  this.StartPositionOfActor = new CL3D.Vect3d;
  this.NearestSceneNodeFromAIAnimator_NodeOut = null;
  this.NearestSceneNodeFromAIAnimator_maxDistance = 0;
};
CL3D.AnimatorGameAI.prototype = new CL3D.Animator;
CL3D.AnimatorGameAI.prototype.getType = function() {
  return "gameai";
};
CL3D.AnimatorGameAI.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorGameAI(this.TheSceneManager);
  b.AIType = this.AIType;
  b.MovementSpeed = this.MovementSpeed;
  b.ActivationRadius = this.ActivationRadius;
  b.CanFly = this.CanFly;
  b.Health = this.Health;
  b.Tags = this.Tags;
  b.AttacksAIWithTags = this.AttacksAIWithTags;
  b.PatrolRadius = this.PatrolRadius;
  b.RotationSpeedMs = this.RotationSpeedMs;
  b.PathIdToFollow = this.PathIdToFollow;
  b.PatrolWaitTimeMs = this.PatrolWaitTimeMs;
  b.AdditionalRotationForLooking = this.AdditionalRotationForLooking ? this.AdditionalRotationForLooking.clone() : null;
  b.StandAnimation = this.StandAnimation;
  b.WalkAnimation = this.WalkAnimation;
  b.DieAnimation = this.DieAnimation;
  b.AttackAnimation = this.AttackAnimation;
  b.ActionHandlerOnAttack = this.ActionHandlerOnAttack ? this.ActionHandlerOnAttack.createClone(d, e) : null;
  b.ActionHandlerOnActivate = this.ActionHandlerOnActivate ? this.ActionHandlerOnActivate.createClone(d, e) : null;
  b.ActionHandlerOnHit = this.ActionHandlerOnHit ? this.ActionHandlerOnHit.createClone(d, e) : null;
  b.ActionHandlerOnDie = this.ActionHandlerOnDie ? this.ActionHandlerOnDie.createClone(d, e) : null;
  return b;
};
CL3D.AnimatorGameAI.prototype.animateNode = function(c, b) {
  if (c == null || this.TheSceneManager == null) {
    return false;
  }
  var k = b - this.LastTime;
  if (k > 150) {
    k = 150;
  }
  this.LastTime = b;
  var n = 0;
  var l = false;
  if (!(this.TheObject === c)) {
    this.TheObject = c;
    c.updateAbsolutePosition();
    this.StartPositionOfActor = c.getAbsolutePosition();
  }
  var h = c.getAbsolutePosition();
  if (this.CurrentCommand == 3) {
  } else {
    if (this.CurrentCommand == 1) {
      n = this.getCharacterWidth(c);
      if (this.CurrentCommandTargetPos.substract(h).getLength() < n) {
        this.CurrentCommand = 0;
        this.setAnimation(c, 0);
        l = true;
      } else {
        var f = false;
        if (this.CurrentCommandTicksDone > 2) {
          var a = this.CurrentCommandTicksDone * (this.MovementSpeed / 1E3);
          var g = this.BeginPositionWhenStartingCurrentCommand.substract(h).getLength();
          if (g * 1.2 < a) {
            this.CurrentCommand = 0;
            this.setAnimation(c, 0);
            f = true;
          }
        }
        if (!f) {
          this.CurrentCommandTicksDone += k;
          var d = this.CurrentCommandTargetPos.substract(h);
          d.setLength(this.MovementSpeed / 1E3 * k);
          c.Pos.addToThis(d);
        }
        l = this.animateRotation(c, b - this.CurrentCommandStartTime, this.CurrentCommandTargetPos.substract(h), this.RotationSpeedMs);
      }
    } else {
      if (this.CurrentCommand == 2) {
        this.CurrentCommandTicksDone += k;
        if (!this.AttackCommandExecuted && this.CurrentCommandTicksDone > this.CurrentCommandExpectedTickCount / 2) {
          this.CurrentlyShooting = true;
          if (this.ActionHandlerOnAttack) {
            this.ActionHandlerOnAttack.execute(c);
          }
          this.CurrentlyShooting = false;
          this.AttackCommandExecuted = true;
          l = true;
        }
        if (this.CurrentCommandTicksDone > this.CurrentCommandExpectedTickCount) {
          this.CurrentCommand = 0;
        } else {
          l = this.animateRotation(c, b - this.CurrentCommandStartTime, this.CurrentCommandTargetPos.substract(h), Math.min(this.RotationSpeedMs, this.CurrentCommandExpectedTickCount));
        }
      } else {
        if (this.CurrentCommand == 0) {
          if (this.AIType == 1 || (this.AIType == 2 || this.AIType == 3)) {
            var j = this.scanForAttackTargetIfNeeded(b, h);
            if (j != null) {
              var m = this.getAttackDistanceFromWeapon();
              if (!this.Activated && this.ActionHandlerOnActivate) {
                this.ActionHandlerOnActivate.execute(c);
              }
              this.Activated = true;
              l = true;
              if (j.getAbsolutePosition().getDistanceTo(h) < m) {
                if (this.isNodeVisibleFromNode(j, c)) {
                  this.CurrentlyShootingLine.Start = c.getTransformedBoundingBox().getCenter();
                  this.CurrentlyShootingLine.End = j.getTransformedBoundingBox().getCenter();
                  this.attackTarget(c, j, j.getAbsolutePosition(), h, b);
                } else {
                  this.moveToTarget(c, j.getAbsolutePosition(), h, b);
                }
              } else {
                this.moveToTarget(c, j.getAbsolutePosition(), h, b);
              }
            } else {
              if (this.AIType == 2 || this.AIType == 3) {
                if (!this.LastPatrolStartTime || b > this.LastPatrolStartTime + this.PatrolWaitTimeMs) {
                  n = this.getCharacterWidth(c);
                  var i = null;
                  if (this.AIType == 3) {
                    var o = null;
                    if (this.PathIdToFollow != -1 && this.TheSceneManager != null) {
                      o = this.TheSceneManager.getSceneNodeFromId(this.PathIdToFollow);
                    }
                    if (o != null && o.getType() == "path") {
                      if (this.NextPathPointToGoTo >= o.getPathNodeCount()) {
                        this.NextPathPointToGoTo = 0;
                      }
                      i = o.getPathNodePosition(this.NextPathPointToGoTo);
                    }
                    ++this.NextPathPointToGoTo;
                  } else {
                    var e = this.PatrolRadius;
                    this.LastPatrolStartTime = b;
                    i = new CL3D.Vect3d((Math.random() - 0.5) * e, (Math.random() - 0.5) * e, (Math.random() - 0.5) * e);
                    i.addToThis(this.StartPositionOfActor);
                    if (!this.CanFly) {
                      i.Y = this.StartPositionOfActor.Y;
                    }
                  }
                  if (!(i.substract(h).getLength() < n)) {
                    this.moveToTarget(c, i, h, b);
                    l = true;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return l;
};
CL3D.AnimatorGameAI.prototype.animateRotation = function(c, j, h, a) {
  if (!c) {
    return false;
  }
  var b = c.getType() == "camera";
  if (b) {
    return false;
  }
  if (!this.CanFly) {
    h.Y = 0;
  }
  var i = new CL3D.Matrix4;
  i.setRotationDegrees(h.getHorizontalAngle());
  var g = new CL3D.Matrix4;
  g.setRotationDegrees(this.AdditionalRotationForLooking);
  i = i.multiply(g);
  var f = i.getRotationDegrees();
  var l = c.Rot.clone();
  var k = Math.min(j, a) / a;
  k = CL3D.clamp(k, 0, 1);
  f.multiplyThisWithScal(CL3D.DEGTORAD);
  l.multiplyThisWithScal(CL3D.DEGTORAD);
  var e = new CL3D.Quaternion;
  e.setFromEuler(f.X, f.Y, f.Z);
  var d = new CL3D.Quaternion;
  d.setFromEuler(l.X, l.Y, l.Z);
  d.slerp(d, e, k);
  d.toEuler(f);
  f.multiplyThisWithScal(CL3D.RADTODEG);
  if (c.Rot.equals(f)) {
    return false;
  }
  c.Rot = f;
  return true;
};
CL3D.AnimatorGameAI.prototype.moveToTarget = function(c, d, b, a) {
  this.CurrentCommand = 1;
  this.CurrentCommandTargetPos = d;
  this.CurrentCommandStartTime = a;
  this.BeginPositionWhenStartingCurrentCommand = b;
  this.CurrentCommandTicksDone = 0;
  this.CurrentCommandExpectedTickCount = 0;
  this.setAnimation(c, 1);
};
CL3D.AnimatorGameAI.prototype.attackTarget = function(e, a, f, d, b) {
  this.CurrentCommand = 2;
  this.CurrentCommandTargetPos = f;
  this.CurrentCommandStartTime = b;
  this.HandleCurrentCommandTargetNode = a;
  this.BeginPositionWhenStartingCurrentCommand = d;
  this.CurrentCommandTicksDone = 0;
  this.CurrentCommandExpectedTickCount = 500;
  this.AttackCommandExecuted = false;
  var c = this.setAnimation(e, 2);
  if (c != 0) {
    this.CurrentCommandExpectedTickCount = c;
  }
};
CL3D.AnimatorGameAI.prototype.die = function(d, c, a) {
  this.CurrentCommand = 3;
  this.CurrentCommandStartTime = a;
  this.BeginPositionWhenStartingCurrentCommand = c;
  this.CurrentCommandTicksDone = 0;
  this.CurrentCommandExpectedTickCount = 500;
  var b = this.setAnimation(d, 3);
};
CL3D.AnimatorGameAI.prototype.isNodeVisibleFromNode = function(b, a) {
  if (!b || !a) {
    return false;
  }
  return this.isPositionVisibleFromPosition(b.getTransformedBoundingBox().getCenter(), a.getTransformedBoundingBox().getCenter());
};
CL3D.AnimatorGameAI.prototype.isPositionVisibleFromPosition = function(b, a) {
  if (!this.World || !this.TheSceneManager) {
    return true;
  }
  if (this.World.getCollisionPointWithLine(b, a, true, null, true) != null) {
    return false;
  }
  return true;
};
CL3D.AnimatorGameAI.prototype.getNearestSceneNodeFromAIAnimatorAndDistance = function(e, f, a) {
  if (!e || !e.Visible) {
    return;
  }
  var d = false;
  var g = f.getDistanceTo(e.getAbsolutePosition());
  if (g < this.NearestSceneNodeFromAIAnimator_maxDistance) {
    var b = e.getAnimatorOfType("gameai");
    if (b && (a != "" && (!(b === this) && b.isAlive()))) {
      d = b.Tags.indexOf(a) != -1;
    }
  }
  if (d) {
    this.NearestSceneNodeFromAIAnimator_maxDistance = g;
    this.NearestSceneNodeFromAIAnimator_NodeOut = e;
  }
  for (var c = 0;c < e.Children.length;++c) {
    var h = e.Children[c];
    this.getNearestSceneNodeFromAIAnimatorAndDistance(h, f, a);
  }
};
CL3D.AnimatorGameAI.prototype.scanForAttackTargetIfNeeded = function(b, a) {
  if (this.ActivationRadius <= 0 || (!this.TheObject || (this.AttacksAIWithTags.length == 0 || !this.TheSceneManager))) {
    return null;
  }
  if (!this.NextAttackTargetScanTime || b > this.NextAttackTargetScanTime) {
    this.NearestSceneNodeFromAIAnimator_maxDistance = this.ActivationRadius;
    this.NearestSceneNodeFromAIAnimator_NodeOut = null;
    this.getNearestSceneNodeFromAIAnimatorAndDistance(this.TheSceneManager.getRootSceneNode(), a, this.AttacksAIWithTags);
    this.NextAttackTargetScanTime = b + 500 + Math.random() * 1E3;
    return this.NearestSceneNodeFromAIAnimator_NodeOut;
  }
  return null;
};
CL3D.AnimatorGameAI.prototype.getAttackDistanceFromWeapon = function() {
  var a = 1E3;
  if (this.ActionHandlerOnAttack) {
    var b = this.ActionHandlerOnAttack.findAction("Shoot");
    if (b) {
      a = b.getWeaponRange();
    }
  }
  return a;
};
CL3D.AnimatorGameAI.prototype.getCharacterWidth = function(a) {
  if (a != null) {
    return 10;
  }
  var b = a.getTransformedBoundingBox().getExtent();
  b.Y = 0;
  return b.getLength();
};
CL3D.AnimatorGameAI.prototype.getAnimationNameFromType = function(a) {
  switch(a) {
    case 0:
      return this.StandAnimation;
    case 1:
      return this.WalkAnimation;
    case 2:
      return this.AttackAnimation;
    case 3:
      return this.DieAnimation;
  }
  return "";
};
CL3D.AnimatorGameAI.prototype.setAnimation = function(e, d) {
  if (!e || e.getType() != "animatedmesh") {
    return 0;
  }
  var c = e;
  var a = c.Mesh;
  if (!a) {
    return 0;
  }
  var b = a.getNamedAnimationRangeByName(this.getAnimationNameFromType(d));
  if (b) {
    c.setFrameLoop(b.Begin, b.End);
    if (b.FPS != 0) {
      c.setAnimationSpeed(b.FPS);
    }
    c.setLoopMode(d == 1 || d == 0);
    return(b.End - b.Begin) * b.FPS * 1E3;
  } else {
    c.setFrameLoop(1, 1);
    c.setLoopMode(false);
  }
  return 0;
};
CL3D.AnimatorGameAI.prototype.isCurrentlyShooting = function() {
  return this.CurrentlyShooting;
};
CL3D.AnimatorGameAI.prototype.getCurrentlyShootingLine = function() {
  return this.CurrentlyShootingLine;
};
CL3D.AnimatorGameAI.prototype.isAlive = function() {
  return this.Health > 0;
};
CL3D.AnimatorGameAI.prototype.OnHit = function(a, b) {
  if (!b) {
    return;
  }
  if (this.Health == 0) {
    return;
  }
  this.Health -= a;
  if (this.Health < 0) {
    this.Health = 0;
  }
  if (this.Health == 0) {
    if (this.ActionHandlerOnDie != null) {
      this.ActionHandlerOnDie.execute(b);
    }
    this.die(b, b.getAbsolutePosition(), 0);
  } else {
    if (this.ActionHandlerOnHit != null) {
      this.ActionHandlerOnHit.execute(b);
    }
  }
};
CL3D.AnimatorGameAI.prototype.findActionByType = function(b) {
  var a = null;
  if (this.ActionHandlerOnAttack) {
    a = this.ActionHandlerOnAttack.findAction(b);
    if (a) {
      return a;
    }
  }
  if (this.ActionHandlerOnActivate) {
    a = this.ActionHandlerOnActivate.findAction(b);
    if (a) {
      return a;
    }
  }
  if (this.ActionHandlerOnHit) {
    a = this.ActionHandlerOnHit.findAction(b);
    if (a) {
      return a;
    }
  }
  if (this.ActionHandlerOnDie) {
    a = this.ActionHandlerOnDie.findAction(b);
    if (a) {
      return a;
    }
  }
  return null;
};
CL3D.CopperCubeVariables = new Array;
CL3D.CopperCubeVariable = function() {
  this.Name = "";
  this.StringValue = "";
  this.ActiveValueType = 0;
  this.IntValue = 0;
  this.FloatValue = 0;
};
CL3D.CopperCubeVariable.getVariable = function(b, a, e) {
  if (b == null) {
    return null;
  }
  var h = b.toLowerCase();
  var c = CL3D.CopperCubeVariables;
  for (var d = 0;d < c.length;++d) {
    var j = c[d];
    if (j != null && j.getName().toLowerCase() == h) {
      return j;
    }
  }
  var g = CL3D.CopperCubeVariable.createTemporaryVariableIfPossible(b, e);
  if (g) {
    return g;
  }
  if (a == true) {
    var f = new CL3D.CopperCubeVariable;
    f.setName(b);
    c.push(f);
    return f;
  }
  return null;
};
CL3D.CopperCubeVariable.createTemporaryVariableIfPossible = function(a, d) {
  var h = CL3D.CopperCubeVariable.getSceneNodeAndAttributeNameFromTemporaryVariableName(a, d);
  if (h == null) {
    return null;
  }
  var i = new CL3D.CopperCubeVariable;
  i.setName(a);
  i.setValueAsInt(0);
  var b = h.node;
  if (h.attrname == "health" && b != null) {
    var c = b.getAnimatorOfType("gameai");
    if (c != null) {
      i.setValueAsInt(c.Health);
    }
  } else {
    if (h.attrname == "movementspeed" && b != null) {
      var e = b.getAnimatorOfType("gameai");
      var j = b.getAnimatorOfType("keyboardcontrolled");
      var g = b.getAnimatorOfType("camerafps");
      if (g) {
        i.setValueAsFloat(g.MoveSpeed);
      } else {
        if (j) {
          i.setValueAsFloat(j.MoveSpeed);
        } else {
          if (e) {
            i.setValueAsFloat(e.MovementSpeed);
          }
        }
      }
    } else {
      if (h.attrname == "damage" && b != null) {
        var f = b.findActionOfType("Shoot");
        if (f) {
          i.setValueAsInt(f.Damage);
        }
      } else {
        if (h.attrname == "colsmalldistance" && b != null) {
          var k = b.getAnimatorOfType("collisionresponse");
          if (k != null) {
            i.setValueAsFloat(k.SlidingSpeed);
          }
        } else {
          if (h.attrname == "soundvolume") {
            i.setValueAsFloat(CL3D.gSoundManager.getGlobalVolume() * 100);
          }
        }
      }
    }
  }
  return i;
};
CL3D.CopperCubeVariable.saveContentOfPotentialTemporaryVariableIntoSource = function(a, f) {
  var i = CL3D.CopperCubeVariable.getSceneNodeAndAttributeNameFromTemporaryVariableName(a.Name, f);
  if (i == null) {
    return;
  }
  var c = i.node;
  if (i.attrname == "health" && c != null) {
    var d = c.getAnimatorOfType("gameai");
    if (d != null) {
      var m = d.Health;
      var b = a.getValueAsInt();
      var l = m - b;
      if (l > 0) {
        d.OnHit(l, c);
      } else {
        d.Health = b;
      }
    }
  } else {
    if (i.attrname == "movementspeed" && c != null) {
      var e = c.getAnimatorOfType("gameai");
      var j = c.getAnimatorOfType("keyboardcontrolled");
      var h = c.getAnimatorOfType("camerafps");
      if (h) {
        h.MoveSpeed = a.getValueAsFloat();
      } else {
        if (j) {
          j.MoveSpeed = a.getValueAsFloat();
        } else {
          if (e) {
            e.MovementSpeed = a.getValueAsFloat();
          }
        }
      }
    } else {
      if (i.attrname == "damage" && c != null) {
        var g = c.findActionOfType("Shoot");
        if (g) {
          g.Damage = a.getValueAsInt();
        }
      } else {
        if (i.attrname == "damage" && c != null) {
          var g = c.findActionOfType("Shoot");
          if (g) {
            g.Damage = a.getValueAsInt();
          }
        } else {
          if (i.attrname == "colsmalldistance" && c != null) {
            var k = c.getAnimatorOfType("collisionresponse");
            if (k != null) {
              k.SlidingSpeed = a.getValueAsInt();
              k.UseFixedSlidingSpeed = true;
            }
          } else {
            if (i.attrname == "soundvolume") {
              CL3D.gSoundManager.setGlobalVolume(a.getValueAsFloat() / 100);
            }
          }
        }
      }
    }
  }
};
CL3D.CopperCubeVariable.getSceneNodeAndAttributeNameFromTemporaryVariableName = function(b, e) {
  if (b.length == 0 || e == null) {
    return null;
  }
  if (b[0] != "#") {
    return null;
  }
  var g = b.indexOf(".");
  if (g == -1) {
    return null;
  }
  var d = b.substr(g + 1, b.length - g);
  if (d.length == 0) {
    return null;
  }
  var f = b.substr(1, g - 1);
  var c = null;
  if (f == "system") {
  } else {
    c = e.getSceneNodeFromName(f);
    if (c == null) {
      return null;
    }
  }
  var a = new Object;
  a.node = c;
  a.attrname = d;
  return a;
};
CL3D.CopperCubeVariable.prototype.isString = function() {
  return this.ActiveValueType == 0;
};
CL3D.CopperCubeVariable.prototype.isFloat = function() {
  return this.ActiveValueType == 2;
};
CL3D.CopperCubeVariable.prototype.isInt = function() {
  return this.ActiveValueType == 1;
};
CL3D.CopperCubeVariable.prototype.getName = function() {
  return this.Name;
};
CL3D.CopperCubeVariable.prototype.setName = function(a) {
  this.Name = a;
};
CL3D.CopperCubeVariable.prototype.setAsCopy = function(a) {
  if (a == null) {
    return;
  }
  this.ActiveValueType = a.ActiveValueType;
  this.StringValue = a.StringValue;
  this.IntValue = a.IntValue;
  this.FloatValue = a.FloatValue;
};
CL3D.CopperCubeVariable.prototype.getValueAsString = function() {
  switch(this.ActiveValueType) {
    case 1:
      return String(this.IntValue);
    case 2:
      if (this.FloatValue % 1 == 0) {
        return String(this.FloatValue);
      } else {
        return this.FloatValue.toFixed(6);
      }
    ;
  }
  return this.StringValue;
};
CL3D.CopperCubeVariable.prototype.getValueAsInt = function() {
  switch(this.ActiveValueType) {
    case 0:
      return Math.floor(this.StringValue);
    case 1:
      return this.IntValue;
    case 2:
      return this.FloatValue;
  }
  return 0;
};
CL3D.CopperCubeVariable.prototype.getValueAsFloat = function() {
  switch(this.ActiveValueType) {
    case 0:
      return Number(this.StringValue);
    case 1:
      return this.IntValue;
    case 2:
      return this.FloatValue;
  }
  return 0;
};
CL3D.CopperCubeVariable.prototype.setValueAsString = function(a) {
  this.ActiveValueType = 0;
  this.StringValue = a;
};
CL3D.CopperCubeVariable.prototype.setValueAsInt = function(a) {
  this.ActiveValueType = 1;
  this.IntValue = a;
};
CL3D.CopperCubeVariable.prototype.setValueAsFloat = function(a) {
  this.ActiveValueType = 2;
  this.FloatValue = a;
};
CL3D.AnimatorKeyboardControlled = function(b, a) {
  this.lastAnimTime = 0;
  this.SMGr = b;
  this.MoveSpeed = 0;
  this.RunSpeed = 0;
  this.RotateSpeed = 0;
  this.JumpSpeed = 0;
  this.UseAcceleration = false;
  this.AccelerationSpeed = 0;
  this.DecelerationSpeed = 0;
  this.FollowSmoothingSpeed = 15;
  this.AdditionalRotationForLooking = new CL3D.Vect3d;
  this.StandAnimation = "";
  this.WalkAnimation = "";
  this.JumpAnimation = "";
  this.RunAnimation = "";
  this.LastAnimationTime = CL3D.CLTimer.getTime();
  this.WasMovingLastFrame = false;
  this.ShiftIsDown = false;
  this.Registered = false;
  this.leftKeyDown = false;
  this.rightKeyDown = false;
  this.upKeyDown = false;
  this.downKeyDown = false;
  this.jumpKeyDown = false;
  this.AcceleratedSpeed = 0;
  this.AccelerationIsForward = false;
  this.firstUpdate = true;
  this.DisableWithoutActiveCamera = false;
  this.Engine = a;
  a.registerAnimatorForKeyUp(this);
  a.registerAnimatorForKeyDown(this);
};
CL3D.AnimatorKeyboardControlled.prototype = new CL3D.Animator;
CL3D.AnimatorKeyboardControlled.prototype.getType = function() {
  return "keyboardcontrolled";
};
CL3D.AnimatorKeyboardControlled.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.AnimatorKeyboardControlled(this.SMGr, this.Engine);
  b.MoveSpeed = this.MoveSpeed;
  b.RunSpeed = this.RunSpeed;
  b.RotateSpeed = this.RotateSpeed;
  b.JumpSpeed = this.JumpSpeed;
  b.FollowSmoothingSpeed = this.FollowSmoothingSpeed;
  b.AdditionalRotationForLooking = this.AdditionalRotationForLooking ? this.AdditionalRotationForLooking.clone() : null;
  b.StandAnimation = this.StandAnimation;
  b.WalkAnimation = this.WalkAnimation;
  b.JumpAnimation = this.JumpAnimation;
  b.RunAnimation = this.RunAnimation;
  b.UseAcceleration = this.UseAcceleration;
  b.AccelerationSpeed = this.AccelerationSpeed;
  b.DecelerationSpeed = this.DecelerationSpeed;
  b.DisableWithoutActiveCamera = this.DisableWithoutActiveCamera;
  return b;
};
CL3D.AnimatorKeyboardControlled.prototype.setKeyBool = function(b, a) {
  if (a == 37 || a == 65) {
    this.leftKeyDown = b;
    if (b) {
      this.rightKeyDown = false;
    }
    return true;
  }
  if (a == 39 || a == 68) {
    this.rightKeyDown = b;
    if (b) {
      this.leftKeyDown = false;
    }
    return true;
  }
  if (a == 38 || a == 87) {
    this.upKeyDown = b;
    if (b) {
      this.downKeyDown = false;
    }
    return true;
  }
  if (a == 40 || a == 83) {
    this.downKeyDown = b;
    if (b) {
      this.upKeyDown = false;
    }
    return true;
  }
  if (a == 32) {
    this.jumpKeyDown = b;
    return true;
  }
  return false;
};
CL3D.AnimatorKeyboardControlled.prototype.onKeyDown = function(a) {
  this.ShiftIsDown = a.shiftKey == 1;
  return this.setKeyBool(true, a.keyCode);
};
CL3D.AnimatorKeyboardControlled.prototype.onKeyUp = function(a) {
  this.ShiftIsDown = a.shiftKey == 1;
  return this.setKeyBool(false, a.keyCode);
};
CL3D.AnimatorKeyboardControlled.prototype.animateNode = function(p, v) {
  var m = v - this.lastAnimTime;
  if (m > 250) {
    m = 250;
  }
  this.lastAnimTime = v;
  var e = false;
  this.LastAnimationTime = v;
  if (this.DisableWithoutActiveCamera) {
    var j = p.scene.getActiveCamera();
    if (j != null) {
      var o = j.getAnimatorOfType("3rdpersoncamera");
      if (o != null) {
        if (!(o.NodeToFollow === p)) {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  var c = p.Rot;
  if (this.leftKeyDown) {
    c.Y -= m * this.RotateSpeed * 0.001;
    e = true;
  }
  if (this.rightKeyDown) {
    c.Y += m * this.RotateSpeed * 0.001;
    e = true;
  }
  var d = p.Pos;
  var t = new CL3D.Matrix4;
  t.setRotationDegrees(c);
  var g = new CL3D.Vect3d(0, 0, 1);
  var n = new CL3D.Matrix4;
  n.setRotationDegrees(this.AdditionalRotationForLooking);
  t = t.multiply(n);
  t.rotateVect(g);
  var h = this.ShiftIsDown;
  var r = (h ? this.RunSpeed : this.MoveSpeed) * m;
  var q = 0;
  var k = this.downKeyDown;
  var i = this.upKeyDown;
  if (this.UseAcceleration && m) {
    if (i || k) {
      if (this.AccelerationIsForward != i) {
        if (this.DecelerationSpeed == 0) {
          this.AcceleratedSpeed *= -1;
        } else {
          this.AcceleratedSpeed = 0;
        }
      }
      this.AccelerationIsForward = !k;
      q = r / m;
      this.AcceleratedSpeed += this.AccelerationSpeed * q * (m / 1E3);
      if (this.AcceleratedSpeed > q) {
        this.AcceleratedSpeed = q;
      }
      r = this.AcceleratedSpeed * m;
    } else {
      if (this.DecelerationSpeed == 0) {
        this.AcceleratedSpeed = 0;
      } else {
        q = r / Number(m);
        this.AcceleratedSpeed -= this.DecelerationSpeed * q * (m / 1E3);
        if (this.AcceleratedSpeed < 0) {
          this.AcceleratedSpeed = 0;
        }
        r = this.AcceleratedSpeed * m;
      }
    }
  }
  g.setLength(r);
  if (i || (k || this.UseAcceleration && this.AcceleratedSpeed != 0)) {
    var l = g.clone();
    if (k || !(i || k) && !this.AccelerationIsForward) {
      l.multiplyThisWithScal(-1);
    }
    p.Pos.addToThis(l);
    e = true;
    this.WasMovingLastFrame = true;
  }
  if (i || k) {
    this.setAnimation(p, h ? 3 : 1, k);
    this.WasMovingLastFrame = true;
    e = true;
  } else {
    if (this.WasMovingLastFrame) {
      var f = false;
      var w = p.getAnimatorOfType("collisionresponse");
      if (w) {
        f = w.isFalling();
      }
      if (!f) {
        this.setAnimation(p, 0, false);
      }
      this.WasMovingLastFrame = false;
    }
  }
  if (this.jumpKeyDown) {
    var u = p.getAnimatorOfType("collisionresponse");
    if (u && !u.isFalling()) {
      u.jump(this.JumpSpeed);
      this.setAnimation(p, 2, false);
      e = true;
    }
  }
  return e;
};
CL3D.AnimatorKeyboardControlled.prototype.getAnimationNameFromType = function(a) {
  switch(a) {
    case 0:
      return this.StandAnimation;
    case 1:
      return this.WalkAnimation;
    case 2:
      return this.JumpAnimation;
    case 3:
      return this.RunAnimation;
  }
  return "";
};
CL3D.AnimatorKeyboardControlled.prototype.setAnimation = function(g, f, a) {
  if (!g || g.getType() != "animatedmesh") {
    return 0;
  }
  var d = g;
  var b = d.Mesh;
  if (!b) {
    return 0;
  }
  var c = b.getNamedAnimationRangeByName(this.getAnimationNameFromType(f));
  if (c) {
    var e = 1 * c.FPS;
    if (a) {
      e *= -1;
    }
    if (!(d.EndFrame == c.End && (d.StartFrame == c.Begin && CL3D.equals(d.FramesPerSecond, e)))) {
      d.setFrameLoop(c.Begin, c.End);
      if (e) {
        d.setAnimationSpeed(e);
      }
      d.setLoopMode(f == 0 || (f == 1 || f == 3));
    }
    return(c.End - c.Begin) * c.FPS * 1E3;
  } else {
    d.setFrameLoop(1, 1);
    d.setLoopMode(false);
  }
  return 0;
};
CL3D.Animator3rdPersonCamera = function(a) {
  this.lastAnimTime = 0;
  this.SMGr = a;
  this.SceneNodeIDToFollow = -1;
  this.FollowSmoothingSpeed = 15;
  this.AdditionalRotationForLooking = new CL3D.Vect3d;
  this.FollowMode = 0;
  this.TargetHeight = 0;
  this.CollidesWithWorld = false;
  this.World = 0;
  this.LastAnimationTime = 0;
  this.InitialDeltaToObject = new CL3D.Vect3d;
  this.DeltaToCenterOfFollowObject = new CL3D.Vect3d;
  this.NodeToFollow = null;
  this.TriedToLinkWithNode = false;
  this.firstUpdate = true;
};
CL3D.Animator3rdPersonCamera.prototype = new CL3D.Animator;
CL3D.Animator3rdPersonCamera.prototype.getType = function() {
  return "3rdpersoncamera";
};
CL3D.Animator3rdPersonCamera.prototype.createClone = function(c, f, d, e) {
  var b = new CL3D.Animator3rdPersonCamera(this.SMGr);
  b.SceneNodeIDToFollow = this.SceneNodeIDToFollow;
  b.FollowSmoothingSpeed = this.FollowSmoothingSpeed;
  b.AdditionalRotationForLooking = this.AdditionalRotationForLooking.clone();
  b.FollowMode = this.FollowMode;
  b.TargetHeight = this.TargetHeight;
  b.CollidesWithWorld = this.CollidesWithWorld;
  b.World = this.World;
  return b;
};
CL3D.Animator3rdPersonCamera.prototype.animateNode = function(q, z) {
  var n = z - this.lastAnimTime;
  if (n > 250) {
    n = 250;
  }
  this.lastAnimTime = z;
  var h = false;
  if (q == null) {
    return false;
  }
  var u = q;
  this.linkWithNode(q.scene);
  if (!this.NodeToFollow) {
    return false;
  }
  var h = false;
  var v = u.Target.clone();
  u.Target = this.NodeToFollow.getAbsolutePosition();
  u.Target.addToThis(this.DeltaToCenterOfFollowObject);
  u.Target.Y += this.TargetHeight;
  if (!u.Target.equals(v)) {
    h = true;
  }
  if (this.firstUpdate) {
    this.NodeToFollow.updateAbsolutePosition();
    u.updateAbsolutePosition();
    this.DeltaToCenterOfFollowObject = this.NodeToFollow.getBoundingBox().getExtent();
    this.DeltaToCenterOfFollowObject.Y = this.DeltaToCenterOfFollowObject.Y / 2;
    this.DeltaToCenterOfFollowObject.X = 0;
    this.DeltaToCenterOfFollowObject.Z = 0;
    this.lastAnimTime = z;
    this.firstUpdate = false;
  }
  if (!(u.scene.getActiveCamera() === u)) {
    return false;
  }
  if (this.InitialDeltaToObject.equalsZero()) {
    this.InitialDeltaToObject = this.NodeToFollow.getAbsolutePosition().substract(u.getAbsolutePosition());
    var e = new CL3D.Matrix4;
    e.setRotationDegrees(this.NodeToFollow.Rot);
    e.inverseRotateVect(this.InitialDeltaToObject);
  }
  var a = this.NodeToFollow.Rot;
  var x = new CL3D.Matrix4;
  x.setRotationDegrees(a);
  var p = new CL3D.Matrix4;
  p.setRotationDegrees(this.AdditionalRotationForLooking);
  x = x.multiply(p);
  var y = u.Pos.clone();
  switch(this.FollowMode) {
    case 0:
      break;
    case 2:
      y = this.NodeToFollow.getAbsolutePosition().substract(this.InitialDeltaToObject);
      break;
    case 1:
      var j = this.InitialDeltaToObject.clone();
      x.rotateVect(j);
      var i = this.NodeToFollow.getAbsolutePosition().substract(j);
      var A = u.getAbsolutePosition().getDistanceTo(i);
      var b = this.InitialDeltaToObject.getLength();
      var r = A > b * 2.2;
      if (CL3D.equals(this.FollowSmoothingSpeed, 0) || r) {
        y = i;
      } else {
        var w = Math.sqrt(A) * (n / 1E3) * this.FollowSmoothingSpeed;
        if (w > A) {
          w = A;
        }
        var l = i.substract(u.Pos);
        l.setLength(w);
        l.addToThis(u.Pos);
        y = l;
      }
      break;
  }
  if (this.CollidesWithWorld && (this.World != null && !u.Pos.equals(y))) {
    this.World.setNodeToIgnore(this.NodeToFollow);
    var k = new CL3D.Line3d;
    k.Start = u.Target.clone();
    k.End = y.clone();
    var m = k.getVector();
    var o = m.getLength();
    var g = this.InitialDeltaToObject.getLength() / 10;
    m.setLength(g);
    k.End.addToThis(m);
    var t = new CL3D.Triangle3d;
    var f = this.World.getCollisionPointWithLine(k.Start, k.End, true, t, true);
    if (f != null) {
      var c = f.substract(k.Start);
      var d = c.getLength();
      if (d < g) {
        d = g;
      }
      d -= g;
      if (d > o) {
        d = o;
      }
      c.setLength(d);
      y = k.Start.add(c);
    }
    this.World.setNodeToIgnore(null);
  }
  if (!u.Pos.equals(y)) {
    h = true;
    u.Pos = y;
  }
  return h;
};
CL3D.Animator3rdPersonCamera.prototype.linkWithNode = function(a) {
  if (this.TriedToLinkWithNode) {
    return;
  }
  if (this.SceneNodeIDToFollow == -1) {
    return;
  }
  if (a == null) {
    return;
  }
  var b = a.getSceneNodeFromId(this.SceneNodeIDToFollow);
  if (b && !(b === this.NodeToFollow)) {
    this.NodeToFollow = b;
    this.firstUpdate = true;
  }
  this.TriedToLinkWithNode = true;
};
CL3D.AnimatorOnFirstFrame = function(a) {
  this.RunAlready = false;
  this.AlsoOnReload = false;
  this.SMGr = a;
  this.TheActionHandler = null;
};
CL3D.AnimatorOnFirstFrame.prototype = new CL3D.Animator;
CL3D.AnimatorOnFirstFrame.prototype.getType = function() {
  return "onfirstframe";
};
CL3D.AnimatorOnFirstFrame.prototype.animateNode = function(b, a) {
  if (this.RunAlready) {
    return false;
  }
  this.RunAlready = true;
  if (this.TheActionHandler) {
    this.TheActionHandler.execute(b);
    return true;
  }
  return false;
};
CL3D.AnimatorMobileInput = function(b, d, c) {
  this.SMGr = d;
  this.Obj = c;
  this.engine = b;
  this.MouseDown = false;
  d.registerSceneNodeAnimatorForEvents(this);
  this.KeyDown = new Array;
  for (var a = 0;a < 255;++a) {
    this.KeyDown.push(false);
  }
  this.CoordArray = new Array;
  this.CoordArray.push(new CL3D.Vect2d(-1, 0));
  this.CoordArray.push(new CL3D.Vect2d(0, -1));
  this.CoordArray.push(new CL3D.Vect2d(1, 0));
  this.CoordArray.push(new CL3D.Vect2d(0, 1));
};
CL3D.AnimatorMobileInput.prototype = new CL3D.Animator;
CL3D.AnimatorMobileInput.prototype.getType = function() {
  return "mobileinput";
};
CL3D.AnimatorMobileInput.prototype.animateNode = function(c, b) {
  var g = false;
  if (this.Obj.InputMode == 1) {
    this.postKey(this.MouseDown && this.Obj.MouseOverButton, this.Obj.KeyCode);
  } else {
    var f = Math.sqrt(this.Obj.CursorPosX * this.Obj.CursorPosX + this.Obj.CursorPosY * this.Obj.CursorPosY);
    var d = 0.3;
    if (f < d || !this.MouseDown) {
      if (!this.MouseDown) {
        g = this.Obj.CursorPosX != 0 && this.Obj.CursorPosY != 0;
        this.Obj.CursorPosX = 0;
        this.Obj.CursorPosY = 0;
      }
      this.postKey(false, 37);
      this.postKey(false, 38);
      this.postKey(false, 39);
      this.postKey(false, 40);
    } else {
      for (var e = 0;e < 4;++e) {
        var j = this.CoordArray[e].X - this.Obj.CursorPosX;
        var h = this.CoordArray[e].Y - this.Obj.CursorPosY;
        var a = Math.sqrt(j * j + h * h) < 1;
        this.postKey(a, 37 + e);
      }
    }
  }
  return g;
};
CL3D.AnimatorMobileInput.prototype.postKey = function(c, a) {
  if (this.KeyDown[a] == c) {
    return;
  }
  this.KeyDown[a] = c;
  var b = new Object;
  b.keyCode = a;
  if (c) {
    this.engine.handleKeyDown(b);
  } else {
    this.engine.handleKeyUp(b);
  }
};
CL3D.AnimatorMobileInput.prototype.onMouseUp = function(a) {
  this.MouseDown = false;
};
CL3D.AnimatorMobileInput.prototype.onMouseDown = function(a) {
  this.MouseDown = true;
};
CL3D.AnimatorMobileInput.prototype.onMouseMove = function(b) {
  if (this.MouseDown && (this.Obj.MouseOverButton && (this.Obj.RealWidth != 0 && this.Obj.RealHeight != 0))) {
    var a = this.engine.getMousePosXFromEvent(b) - this.Obj.RealPosX;
    var c = this.engine.getMousePosYFromEvent(b) - this.Obj.RealPosY;
    this.Obj.CursorPosX = a / this.Obj.RealWidth;
    this.Obj.CursorPosY = c / this.Obj.RealHeight;
    this.Obj.CursorPosX = CL3D.clamp(this.Obj.CursorPosX, 0, 1);
    this.Obj.CursorPosY = CL3D.clamp(this.Obj.CursorPosY, 0, 1);
    this.Obj.CursorPosX = this.Obj.CursorPosX * 2 - 1;
    this.Obj.CursorPosY = this.Obj.CursorPosY * 2 - 1;
  }
};
CL3D.SoundManager = function() {
  this.Sounds = new Array;
  this.PlayingSounds = new Array;
  this.GlobalVolume = 1;
};
CL3D.SoundManager.prototype.getSoundFromName = function(a) {
  for (var c = 0;c < this.Sounds.length;++c) {
    var b = this.Sounds[c];
    if (b.Name == a) {
      return b;
    }
  }
  return null;
};
CL3D.SoundManager.prototype.addSound = function(a) {
  if (a != null) {
    if (this.getSoundFromName(a.Name) != null && CL3D.gCCDebugOutput) {
      CL3D.gCCDebugOutput.print("ERROR! Cannot add the sound multiple times: " + a.Name);
    }
    this.Sounds.push(a);
  }
};
CL3D.SoundManager.prototype.getSoundFromSoundName = function(b, a) {
  if (b == null || b == "") {
    return null;
  }
  var c = this.getSoundFromName(b);
  if (c != null) {
    return c;
  }
  if (a) {
    c = new CL3D.SoundSource(b);
    this.addSound(c);
    return c;
  }
  return null;
};
CL3D.SoundManager.prototype.play2D = function(e, a, h) {
  if (e == null) {
    return null;
  }
  var b = null;
  if (typeof e == "string") {
    b = this.getSoundFromSoundName(e, true);
  } else {
    b = e;
  }
  if (b == null || b.audioElem == null) {
    return null;
  }
  this.clearFinishedPlayingSounds();
  for (var c = 0;c < this.PlayingSounds.length;) {
    if (this.PlayingSounds[c].src === b) {
      this.PlayingSounds[c].src.audioElem.pause();
      this.PlayingSounds.splice(c, 1);
    } else {
      ++c;
    }
  }
  try {
    b.audioElem.currentTime = 0;
  } catch (g) {
  }
  if (typeof h === "undefined") {
    h = 1;
  }
  b.audioElem.volume = h * this.GlobalVolume;
  b.audioElem.play();
  var d = new CL3D.PlayingSound(b);
  d.ownVolume = h;
  this.PlayingSounds.push(d);
  if (b.lastListener) {
    b.audioElem.removeEventListener("ended", b.lastListener, false);
  }
  b.audioElem.lastListener = null;
  if (a) {
    d.looping = true;
    var f = function() {
      if (!d.hasStopped) {
        try {
          this.currentTime = 0;
        } catch (i) {
        }
        this.play();
      }
    };
    b.audioElem.addEventListener("ended", f, false);
    b.audioElem.lastListener = f;
  }
  return d;
};
CL3D.SoundManager.prototype.stop = function(a) {
  if (!a) {
    return;
  }
  a.src.audioElem.pause();
  a.hasStopped = true;
  this.clearFinishedPlayingSounds();
};
CL3D.SoundManager.prototype.getGlobalVolume = function() {
  return this.GlobalVolume;
};
CL3D.SoundManager.prototype.setGlobalVolume = function(a) {
  this.GlobalVolume = a;
  if (this.GlobalVolume < 0) {
    this.GlobalVolume = 0;
  }
  if (this.GlobalVolume > 1) {
    this.GlobalVolume = 1;
  }
  try {
    for (var b = 0;b < this.PlayingSounds.length;++b) {
      var c = this.PlayingSounds[b];
      c.src.audioElem.volume = c.ownVolume * this.GlobalVolume;
    }
  } catch (d) {
  }
};
CL3D.SoundManager.prototype.setVolume = function(c, a) {
  if (!c) {
    return;
  }
  try {
    c.src.audioElem.volume = a;
  } catch (b) {
  }
};
CL3D.SoundManager.prototype.stopAll = function() {
  for (var a = 0;a < this.PlayingSounds.length;++a) {
    var b = this.PlayingSounds[a];
    b.hasStopped = true;
    b.src.audioElem.pause();
  }
  this.PlayingSounds = new Array;
};
CL3D.SoundManager.prototype.clearFinishedPlayingSounds = function() {
  for (var a = 0;a < this.PlayingSounds.length;) {
    if (this.PlayingSounds[a].hasPlayingCompleted()) {
      this.PlayingSounds.splice(a, 1);
    } else {
      ++a;
    }
  }
};
CL3D.gSoundManager = new CL3D.SoundManager;
CL3D.SoundSource = function(c) {
  this.Name = c;
  var b = null;
  try {
    b = new Audio;
    b.src = c;
  } catch (d) {
  }
  this.loaded = true;
  this.audioElem = b;
};
CL3D.SoundSource.prototype.onAudioLoaded = function() {
};
CL3D.PlayingSound = function(a) {
  this.src = a;
  this.hasStopped = false;
  this.looping = false;
  this.ownVolume = 1;
  var b = new Date;
  this.startTime = b.getTime();
};
CL3D.PlayingSound.prototype.hasPlayingCompleted = function() {
  if (this.hasStopped) {
    return true;
  }
  if (this.looping) {
    return false;
  }
  var c = new Date;
  var a = c.getTime();
  var b = this.src.duration;
  return b > 0 && a > this.startTime + b;
};
var startCopperLichtFromFile = function(e, a, b, d) {
  var f = new CL3D.CopperLicht(e, true, null, false, b, d);
  f.load(a);
  return f;
};
CL3D.CopperLicht = function(f, g, e, b, a, d) {
  if ((g == null || g == true) && CL3D.gCCDebugOutput == null) {
    CL3D.gCCDebugOutput = new CL3D.DebugOutput(f, b);
  }
  this.ElementIdOfCanvas = f;
  this.MainElement = document.getElementById(this.ElementIdOfCanvas);
  this.Document = new CL3D.CCDocument;
  this.TheRenderer = null;
  this.IsPaused = false;
  this.NextCameraToSetActive = null;
  this.TheTextureManager = new CL3D.TextureManager;
  this.TheMeshCache = new CL3D.MeshCache;
  this.LoadingAFile = false;
  this.WaitingForTexturesToBeLoaded = false;
  this.LoadingAnimationCounter = 0;
  this.FPS = 60;
  this.OnAnimate = null;
  this.OnBeforeDrawAll = null;
  this.OnAfterDrawAll = null;
  this.OnLoadingComplete = null;
  if (d == null) {
    this.NoWebGLText = 'Error: This browser does not support WebGL (or it is disabled).<br/>See <a href="www.ambiera.com/copperlicht/browsersupport.html">here</a> for details.';
  } else {
    this.NoWebGLText = d;
  }
  this.RegisteredAnimatorsForKeyUp = new Array;
  this.RegisteredAnimatorsForKeyDown = new Array;
  this.MouseIsDown = false;
  this.MouseX = 0;
  this.MouseY = 0;
  this.MouseDownX = 0;
  this.MouseDownY = 0;
  this.MouseIsInside = true;
  this.LastCameraDragTime = 0;
  this.LoadingDialog = null;
  if (a != null) {
    this.createTextDialog(true, a);
  }
  this.updateCanvasTopLeftPosition();
  if (e) {
    this.FPS = e;
  }
  var c = this;
  setInterval(function() {
    c.loadingUpdateIntervalHandler();
  }, 500);
  CL3D.ScriptingInterface.getScriptingInterface().setEngine(this);
};
CL3D.CopperLicht.prototype.initRenderer = function() {
  return this.createRenderer();
};
CL3D.CopperLicht.prototype.getRenderer = function() {
  return this.TheRenderer;
};
CL3D.CopperLicht.prototype.getScene = function() {
  if (this.Document == null) {
    return null;
  }
  return this.Document.getCurrentScene();
};
CL3D.CopperLicht.prototype.registerEventHandlers = function() {
  var b = this;
  document.onkeydown = function(c) {
    b.handleKeyDown(c);
  };
  document.onkeyup = function(c) {
    b.handleKeyUp(c);
  };
  var f = this.MainElement;
  if (f != null) {
    f.onmousemove = function(c) {
      b.handleMouseMove(c);
    };
    f.onmousedown = function(c) {
      b.handleMouseDown(c);
    };
    f.onmouseup = function(c) {
      b.handleMouseUp(c);
    };
    f.onmouseover = function(c) {
      b.MouseIsInside = true;
    };
    f.onmouseout = function(c) {
      b.MouseIsInside = false;
    };
    try {
      var a = function(c) {
        b.handleMouseWheel(c);
      };
      f.addEventListener("mousewheel", a, false);
      f.addEventListener("DOMMouseScroll", a, false);
    } catch (d) {
    }
  }
};
CL3D.CopperLicht.prototype.load = function(b) {
  if (!this.createRenderer()) {
    this.createTextDialog(false, this.NoWebGLText);
    return false;
  }
  var c = this;
  this.LoadingAFile = true;
  var a = new CL3D.CCFileLoader(b);
  a.load(function(d) {
    c.parseFile(d, b);
  });
  return true;
};
CL3D.CopperLicht.prototype.createRenderer = function() {
  if (this.TheRenderer != null) {
    return true;
  }
  var f = this.MainElement;
  if (f == null) {
    return false;
  }
  var d = f;
  var a = CL3D.Renderer2DC != null && CL3D.Renderer2DC.debugForce2D;
  this.TheRenderer = new CL3D.Renderer;
  if (a || this.TheRenderer.init(d) == false) {
    if (CL3D.Renderer2DC != null) {
      this.TheRenderer = new CL3D.Renderer2DC;
      if (this.TheRenderer.init(d) == false) {
        return false;
      }
    } else {
      return false;
    }
  }
  if (this.TheTextureManager) {
    this.TheTextureManager.TheRenderer = this.TheRenderer;
  }
  this.registerEventHandlers();
  var e = this;
  var b = 1E3 / this.FPS;
  setInterval(function() {
    e.draw3DIntervalHandler();
  }, b);
  return true;
};
CL3D.CopperLicht.prototype.draw3DIntervalHandler = function() {
  this.draw3dScene();
  if (CL3D.gCCDebugOutput != null) {
    var b = this.Document.getCurrentScene();
    var a = null;
    CL3D.gCCDebugOutput.updatefps(a);
  }
};
CL3D.CopperLicht.prototype.loadingUpdateIntervalHandler = function() {
  if (this.LoadingDialog != null) {
    this.updateLoadingDialog();
  }
  if (!CL3D.gCCDebugOutput) {
    return;
  }
  ++this.LoadingAnimationCounter;
  var b = 0;
  var c = 0;
  if (this.TheTextureManager) {
    b = this.TheTextureManager.getCountOfTexturesToLoad();
    c = this.TheTextureManager.getTextureCount();
  }
  if (this.WaitingForTexturesToBeLoaded && b == 0) {
    this.WaitingForTexturesToBeLoaded = false;
    this.startFirstSceneAfterEverythingLoaded();
  }
  if (this.LoadingAFile || b) {
    var a = "Loading";
    if (b > 0) {
      a = "Textures loaded: " + (c - b) + "/" + c;
    }
    switch(this.LoadingAnimationCounter % 4) {
      case 0:
        a += "   ";
        break;
      case 1:
        a += ".  ";
        break;
      case 2:
        a += ".. ";
        break;
      case 3:
        a += "...";
        break;
    }
    CL3D.gCCDebugOutput.setLoadingText(a);
  } else {
    CL3D.gCCDebugOutput.setLoadingText(null);
  }
};
CL3D.CopperLicht.prototype.isLoading = function() {
  return this.LoadingAFile || this.WaitingForTexturesToBeLoaded;
};
CL3D.CopperLicht.prototype.parseFile = function(b, c) {
  this.LoadingAFile = false;
  var a = new CL3D.FlaceLoader;
  var d = a.loadFile(b, c, this.TheTextureManager, this.TheMeshCache, this);
  if (d != null) {
    this.Document = d;
    if (a.LoadedAReloadAction) {
      this.LastLoadedFileContent = a.StoredFileContent;
      this.LastLoadedFilename = c;
    }
    if (!d.WaitUntilTexturesLoaded) {
      this.startFirstSceneAfterEverythingLoaded();
    } else {
      this.WaitingForTexturesToBeLoaded = true;
    }
  }
};
CL3D.CopperLicht.prototype.startFirstSceneAfterEverythingLoaded = function() {
  this.gotoScene(this.Document.getCurrentScene());
  this.draw3dScene();
  if (this.OnLoadingComplete != null) {
    this.OnLoadingComplete();
  }
};
CL3D.CopperLicht.prototype.draw3dScene = function() {
  if (this.Document == null || this.TheRenderer == null) {
    return;
  }
  if (this.isLoading()) {
    return;
  }
  this.updateCanvasTopLeftPosition();
  this.internalOnBeforeRendering();
  var b = this.Document.getCurrentScene();
  if (!this.IsPaused && b) {
    if (this.OnAnimate) {
      this.OnAnimate();
    }
    this.TheRenderer.registerFrame();
    if (b.doAnimate(this.TheRenderer)) {
      this.TheRenderer.beginScene(b.BackgroundColor);
      if (this.OnBeforeDrawAll) {
        this.OnBeforeDrawAll();
      }
      b.drawAll(this.TheRenderer);
      if (this.OnAfterDrawAll) {
        this.OnAfterDrawAll();
      }
      var a = CL3D.ScriptingInterface.getScriptingInterfaceReadOnly();
      if (a != null) {
        a.runDrawCallbacks(this.TheRenderer);
      }
      this.TheRenderer.endScene();
    }
  }
  this.internalOnAfterRendering();
};
CL3D.CopperLicht.prototype.internalOnAfterRendering = function() {
  this.setNextCameraActiveIfNeeded();
};
CL3D.CopperLicht.prototype.internalOnBeforeRendering = function() {
  this.setNextCameraActiveIfNeeded();
};
CL3D.CopperLicht.prototype.getScenes = function() {
  if (this.Document) {
    return this.Document.Scenes;
  }
  return 0;
};
CL3D.CopperLicht.prototype.addScene = function(a) {
  if (this.Document) {
    this.Document.Scenes.push(a);
    if (this.Document.Scenes.length == 1) {
      this.Document.setCurrentScene(a);
    }
  }
};
CL3D.CopperLicht.prototype.gotoSceneByName = function(f, e) {
  if (!this.Document) {
    return false;
  }
  var b = this.Document.Scenes;
  var c = f;
  if (e) {
    c = c.toLowerCase();
  }
  for (var d = 0;d < b.length;++d) {
    var a = b[d].Name;
    if (e) {
      a = a.toLowerCase();
    }
    if (c == a) {
      this.gotoScene(b[d]);
      return true;
    }
  }
  return false;
};
CL3D.CopperLicht.prototype.gotoScene = function(f) {
  if (!f) {
    return false;
  }
  var k = f.getSceneType() == "panorama";
  var l = f.getSceneType() == "free";
  var c = null;
  this.Document.setCurrentScene(f);
  if (f.WasAlreadyActivatedOnce) {
    c = f.getActiveCamera();
  } else {
    f.WasAlreadyActivatedOnce = true;
    var b = false;
    var h = f.getAllSceneNodesOfType("camera");
    if (h) {
      for (var e = 0;e < h.length;++e) {
        var d = h[e];
        if (d && d.Active) {
          c = d;
          b = true;
          c.setAutoAspectIfNoFixedSet(this.TheRenderer.width, this.TheRenderer.height);
          break;
        }
      }
    }
    if (!b) {
      var a = 4 / 3;
      if (this.TheRenderer.width && this.TheRenderer.height) {
        a = this.TheRenderer.width / this.TheRenderer.height;
      }
      c = new CL3D.CameraSceneNode;
      c.setAspectRatio(a);
      f.RootNode.addChild(c);
      var j = null;
      var g = null;
      if (!k) {
        g = new CL3D.AnimatorCameraFPS(c, this);
        c.addAnimator(g);
      }
      if (l) {
        if (f.DefaultCameraPos != null) {
          c.Pos = f.DefaultCameraPos.clone();
        }
        if (f.DefaultCameraTarget != null) {
          if (g != null) {
            g.lookAt(f.DefaultCameraTarget);
          } else {
            c.setTarget(f.DefaultCameraTarget);
          }
        }
      }
      if (g) {
        g.setMayMove(!k);
      }
    }
    f.setActiveCamera(c);
    f.CollisionWorld = f.createCollisionGeometry(true);
    this.setCollisionWorldForAllSceneNodes(f.getRootSceneNode(), f.CollisionWorld);
  }
  CL3D.ScriptingInterface.getScriptingInterface().setActiveScene(f);
  f.setRedrawMode(this.Document.UpdateMode);
  f.forceRedrawNextFrame();
  return true;
};
CL3D.CopperLicht.prototype.setNextCameraActiveIfNeeded = function() {
  if (this.NextCameraToSetActive == null) {
    return;
  }
  var a = this.Document.getCurrentScene();
  if (a == null) {
    return;
  }
  if (this.NextCameraToSetActive.scene === a) {
    if (this.TheRenderer) {
      this.NextCameraToSetActive.setAutoAspectIfNoFixedSet(this.TheRenderer.getWidth(), this.TheRenderer.getHeight());
    }
    a.setActiveCamera(this.NextCameraToSetActive);
    this.NextCameraToSetActive = null;
  }
};
CL3D.CopperLicht.prototype.handleKeyDown = function(a) {
  var e = this.getScene();
  if (e == null) {
    return false;
  }
  if (a == null) {
    a = window.event;
  }
  var b = false;
  var d = e.getActiveCamera();
  if (d != null) {
    b = d.onKeyDown(a);
  }
  for (var c = 0;c < this.RegisteredAnimatorsForKeyUp.length;++c) {
    if (this.RegisteredAnimatorsForKeyDown[c].onKeyDown(a)) {
      b = true;
    }
  }
  return this.handleEventPropagation(a, b);
};
CL3D.CopperLicht.prototype.handleKeyUp = function(a) {
  var e = this.getScene();
  if (e == null) {
    return false;
  }
  if (a == null) {
    a = window.event;
  }
  var b = false;
  var d = e.getActiveCamera();
  if (d != null) {
    b = d.onKeyUp(a);
  }
  for (var c = 0;c < this.RegisteredAnimatorsForKeyUp.length;++c) {
    if (this.RegisteredAnimatorsForKeyUp[c].onKeyUp(a)) {
      b = true;
    }
  }
  return this.handleEventPropagation(a, b);
};
CL3D.CopperLicht.prototype.handleEventPropagation = function(a, b) {
  if (b) {
    try {
      a.preventDefault();
    } catch (c) {
    }
    return true;
  }
  return false;
};
CL3D.CopperLicht.prototype.registerAnimatorForKeyUp = function(a) {
  if (a != null) {
    this.RegisteredAnimatorsForKeyUp.push(a);
  }
};
CL3D.CopperLicht.prototype.registerAnimatorForKeyDown = function(a) {
  if (a != null) {
    this.RegisteredAnimatorsForKeyDown.push(a);
  }
};
CL3D.CopperLicht.prototype.updateCanvasTopLeftPosition = function(c) {
  var a = 0;
  var d = 0;
  var b = this.MainElement;
  while (b != null) {
    a += b.offsetLeft;
    d += b.offsetTop;
    b = b.offsetParent;
  }
  this.CanvasTopLeftX = a;
  this.CanvasTopLeftY = d;
};
CL3D.CopperLicht.prototype.getMousePosXFromEvent = function(a) {
  if (a.pageX) {
    return a.pageX - this.CanvasTopLeftX;
  } else {
    return a.clientX - this.MainElement.offsetLeft + document.body.scrollLeft;
  }
};
CL3D.CopperLicht.prototype.getMousePosYFromEvent = function(a) {
  if (a.pageY) {
    return a.pageY - this.CanvasTopLeftY;
  } else {
    return a.clientY - this.MainElement.offsetTop + document.body.scrollTop;
  }
};
CL3D.CopperLicht.prototype.handleMouseDown = function(a) {
  if (a == null) {
    a = window.event;
  }
  this.MouseIsDown = true;
  this.MouseIsInside = true;
  if (a) {
    this.MouseDownX = this.getMousePosXFromEvent(a);
    this.MouseDownY = this.getMousePosYFromEvent(a);
  }
  var c = this.getScene();
  if (c == null) {
    return false;
  }
  var b = c.getActiveCamera();
  if (b != null) {
    b.onMouseDown(a);
  }
  c.postMouseDownToAnimators(a);
  return this.handleEventPropagation(a, true);
};
CL3D.CopperLicht.prototype.isMouseOverCanvas = function() {
  return this.MouseIsInside;
};
CL3D.CopperLicht.prototype.getMouseX = function() {
  return this.MouseX;
};
CL3D.CopperLicht.prototype.getMouseY = function() {
  return this.MouseY;
};
CL3D.CopperLicht.prototype.isMouseDown = function() {
  return this.MouseIsDown;
};
CL3D.CopperLicht.prototype.getMouseDownX = function() {
  return this.MouseDownX;
};
CL3D.CopperLicht.prototype.getMouseDownY = function() {
  return this.MouseDownY;
};
CL3D.CopperLicht.prototype.setMouseDownWhereMouseIsNow = function() {
  this.MouseDownX = this.MouseX;
  this.MouseDownY = this.MouseY;
};
CL3D.CopperLicht.prototype.handleMouseUp = function(a) {
  if (a == null) {
    a = window.event;
  }
  this.MouseIsDown = false;
  var c = this.getScene();
  if (c == null) {
    return false;
  }
  var b = c.getActiveCamera();
  if (b != null) {
    b.onMouseUp(a);
  }
  c.postMouseUpToAnimators(a);
  return this.handleEventPropagation(a, true);
};
CL3D.CopperLicht.prototype.handleMouseWheel = function(a) {
  if (!a) {
    a = event;
  }
  if (!a) {
    return;
  }
  var d = a.detail < 0 || a.wheelDelta > 0 ? 1 : -1;
  var c = this.getScene();
  if (c == null) {
    return;
  }
  var b = c.getActiveCamera();
  if (b != null) {
    b.onMouseWheel(d);
  }
  c.postMouseWheelToAnimators(d);
};
CL3D.CopperLicht.prototype.handleMouseMove = function(a) {
  if (a == null) {
    a = window.event;
  }
  if (a) {
    this.MouseX = this.getMousePosXFromEvent(a);
    this.MouseY = this.getMousePosYFromEvent(a);
  }
  var c = this.getScene();
  if (c == null) {
    return false;
  }
  var b = c.getActiveCamera();
  if (b != null) {
    b.onMouseMove(a);
  }
  c.postMouseMoveToAnimators(a);
  return this.handleEventPropagation(a, true);
};
CL3D.CopperLicht.prototype.OnAnimate = null;
CL3D.CopperLicht.prototype.OnAfterDrawAll = null;
CL3D.CopperLicht.prototype.OnBeforeDrawAll = null;
CL3D.CopperLicht.prototype.OnLoadingComplete = null;
CL3D.CopperLicht.prototype.get3DPositionFrom2DPosition = function(m, k) {
  var a = this.TheRenderer;
  if (a == null) {
    return null;
  }
  var c = a.getProjection();
  var l = a.getView();
  if (c == null || l == null) {
    return null;
  }
  var b = c.multiply(l);
  var i = new CL3D.ViewFrustrum;
  i.setFrom(b);
  var d = i.getFarLeftUp();
  var g = i.getFarRightUp().substract(d);
  var f = i.getFarLeftDown().substract(d);
  var n = a.getWidth();
  var e = a.getHeight();
  var p = m / n;
  var o = k / e;
  var j = d.add(g.multiplyWithScal(p)).add(f.multiplyWithScal(o));
  return j;
};
CL3D.CopperLicht.prototype.get2DPositionFrom3DPosition = function(b) {
  var j = new CL3D.Matrix4(false);
  var a = this.TheRenderer;
  if (!a.Projection) {
    return null;
  }
  a.Projection.copyTo(j);
  j = j.multiply(a.View);
  var i = a.getWidth() / 2;
  var e = a.getHeight() / 2;
  var h = i;
  var g = e;
  if (e == 0 || i == 0) {
    return null;
  }
  var d = new CL3D.Vect3d(b.X, b.Y, b.Z);
  d.W = 1;
  j.multiplyWith1x4Matrix(d);
  var c = d.W == 0 ? 1 : 1 / d.W;
  if (d.Z < 0) {
    return null;
  }
  var f = new CL3D.Vect2d;
  f.X = i * (d.X * c) + h;
  f.Y = g - e * (d.Y * c);
  return f;
};
CL3D.CopperLicht.prototype.setActiveCameraNextFrame = function(a) {
  if (a == null) {
    return;
  }
  this.NextCameraToSetActive = a;
};
CL3D.CopperLicht.prototype.getTextureManager = function() {
  return this.TheTextureManager;
};
CL3D.CopperLicht.prototype.setCollisionWorldForAllSceneNodes = function(g, e) {
  if (!g) {
    return;
  }
  for (var a = 0;a < g.Animators.length;++a) {
    var d = g.Animators[a];
    if (d) {
      if (d.getType() == "collisionresponse") {
        d.setWorld(e);
      } else {
        if (d.getType() == "onclick" || d.getType() == "onmove") {
          d.World = e;
        } else {
          if (d.getType() == "gameai") {
            d.World = e;
          } else {
            if (d.getType() == "3rdpersoncamera") {
              d.World = e;
            }
          }
        }
      }
    }
  }
  for (var b = 0;b < g.Children.length;++b) {
    var f = g.Children[b];
    if (f) {
      this.setCollisionWorldForAllSceneNodes(f, e);
    }
  }
};
CL3D.CopperLicht.prototype.reloadScene = function(e) {
  if (!e || !this.Document) {
    return false;
  }
  if (this.LastLoadedFileContent == null) {
    return false;
  }
  var f = null;
  var g = -1;
  for (var c = 0;c < this.Document.Scenes.length;++c) {
    if (e == this.Document.Scenes[c].Name) {
      g = c;
      f = this.Document.Scenes[c];
      break;
    }
  }
  if (g == -1) {
    return false;
  }
  var a = new CL3D.FlaceLoader;
  var b = a.reloadScene(this.LastLoadedFileContent, f, g, this.LastLoadedFilename, this.TheTextureManager, this.TheMeshCache, this);
  if (b != null) {
    var d = this.Document.getCurrentScene() == f;
    this.Document.Scenes[g] = b;
    if (d) {
      this.gotoScene(b);
    }
  }
  return true;
};
CL3D.CopperLicht.prototype.updateLoadingDialog = function() {
  if (!this.LoadingAFile && !this.WaitingForTexturesToBeLoaded) {
    this.LoadingDialog.style.display = "none";
    this.LoadingDialog = null;
  }
};
CL3D.CopperLicht.prototype.createTextDialog = function(a, j) {
  if (this.MainElement == null) {
    return;
  }
  var d = document.createElement("div");
  this.MainElement.parentNode.appendChild(d);
  var e = document.createElement("div");
  this.updateCanvasTopLeftPosition();
  var i = 200;
  var b = a ? 23 : 100;
  var k = a ? 30 : 0;
  var g = this.CanvasTopLeftX + (this.MainElement.width - i) / 2;
  var f = this.CanvasTopLeftY + this.MainElement.height / 2;
  if (!a) {
    f += 30;
  }
  j = j.replace("$PROGRESS$", "");
  e.style.cssText = "position: absolute; left:" + g + "px; top:" + f + "px; color:#ffffff; padding:5px; background-color:#000000; height:" + b + "px; width:" + i + "px; border-radius:5px; border:1px solid #777777;  opacity:0.5;";
  var c = '<p style="margin:0; padding-left:' + k + 'px; padding-bottom:5px;">' + j + "</p> ";
  if (a) {
    c += '<img style="position:absolute; left:5px; top:3px;" src="copperlichtdata/loading.gif" />';
  }
  e.innerHTML = c;
  d.appendChild(e);
  if (a) {
    this.LoadingDialog = d;
  }
};
CL3D.Scene = function() {
  this.init();
};
CL3D.Scene.prototype.init = function() {
  this.RootNode = new CL3D.SceneNode;
  this.RootNode.scene = this;
  this.Name = "";
  this.BackgroundColor = 0;
  this.CollisionWorld = null;
  this.AmbientLight = new CL3D.ColorF;
  this.AmbientLight.R = 0;
  this.AmbientLight.G = 0;
  this.AmbientLight.B = 0;
  this.LastUsedRenderer = null;
  this.StartTime = 0;
  this.ActiveCamera = null;
  this.ForceRedrawThisFrame = false;
  this.LastViewProj = new CL3D.Matrix4;
  this.TheSkyBoxSceneNode = null;
  this.RedrawMode = 2;
  this.CurrentRenderMode = 0;
  this.SceneNodesToRender = new Array;
  this.SceneNodesToRenderTransparent = new Array;
  this.LightsToRender = new Array;
  this.Overlay2DToRender = new Array;
  this.RegisteredSceneNodeAnimatorsForEventsList = new Array;
  this.NodeCountRenderedLastTime = 0;
  this.SkinnedMeshesRenderedLastTime = 0;
  this.UseCulling = false;
  this.CurrentCameraFrustrum = null;
  this.WasAlreadyActivatedOnce = false;
  this.DeletionList = new Array;
  this.LastBulletImpactPosition = new CL3D.Vect3d;
};
CL3D.Scene.prototype.getCurrentCameraFrustrum = function() {
  return this.CurrentCameraFrustrum;
};
CL3D.Scene.prototype.getSceneType = function() {
  return "unknown";
};
CL3D.Scene.prototype.doAnimate = function(b) {
  this.LastUsedRenderer = b;
  if (this.StartTime == 0) {
    this.StartTime = CL3D.CLTimer.getTime();
  }
  this.TheSkyBoxSceneNode = null;
  var d = false;
  if (this.clearDeletionList(false)) {
    d = true;
  }
  if (this.RootNode.OnAnimate(this, CL3D.CLTimer.getTime())) {
    d = true;
  }
  var e = this.HasViewChangedSinceLastRedraw();
  var c = b ? b.getAndResetTextureWasLoadedFlag() : false;
  var a = this.ForceRedrawThisFrame || (this.RedrawMode == 0 && (e || c) || (this.RedrawMode == 1 && (e || (d || c)) || (this.RedrawMode == 2 || CL3D.ScriptingInterface.getScriptingInterface().needsRedraw())));
  if (!a) {
    return false;
  }
  this.ForceRedrawThisFrame = false;
  return true;
};
CL3D.Scene.prototype.getCurrentRenderMode = function() {
  return this.CurrentRenderMode;
};
CL3D.Scene.prototype.drawAll = function(f) {
  this.SceneNodesToRender = new Array;
  this.SceneNodesToRenderTransparent = new Array;
  this.LightsToRender = new Array;
  this.Overlay2DToRender = new Array;
  this.RootNode.OnRegisterSceneNode(this);
  this.CurrentCameraFrustrum = null;
  this.SkinnedMeshesRenderedLastTime = 0;
  this.CurrentRenderMode = CL3D.Scene.RENDER_MODE_CAMERA;
  var b = null;
  if (this.ActiveCamera) {
    b = this.ActiveCamera.getAbsolutePosition();
    this.ActiveCamera.render(f);
  }
  this.CurrentRenderMode = CL3D.Scene.RENDER_MODE_SKYBOX;
  if (this.SkyBoxSceneNode) {
    this.SkyBoxSceneNode.render(f);
  }
  f.clearDynamicLights();
  f.AmbientLight = this.AmbientLight.clone();
  var d;
  var a = 0;
  if (b != null && this.LightsToRender.length > 0) {
    this.LightsToRender.sort(function(l, i) {
      var m = b.getDistanceFromSQ(l.getAbsolutePosition());
      var k = b.getDistanceFromSQ(i.getAbsolutePosition());
      if (m > k) {
        return 1;
      }
      if (m < k) {
        return-1;
      }
      return 0;
    });
  }
  this.CurrentRenderMode = CL3D.Scene.RENDER_MODE_LIGHTS;
  for (d = 0;d < this.LightsToRender.length;++d) {
    this.LightsToRender[d].render(f);
  }
  a += this.LightsToRender.length;
  var h = null;
  var e = null;
  var c = f.getProjection();
  var g = f.getView();
  if (c != null && (g != null && b != null)) {
    e = new CL3D.ViewFrustrum;
    e.setFrom(c.multiply(g));
    if (this.UseCulling) {
      h = e.getBoundingBox(b);
    }
  }
  this.CurrentCameraFrustrum = e;
  this.CurrentRenderMode = CL3D.Scene.RENDER_MODE_DEFAULT;
  for (d = 0;d < this.SceneNodesToRender.length;++d) {
    var j = this.SceneNodesToRender[d];
    if (h == null || h.intersectsWithBox(j.getTransformedBoundingBox())) {
      j.render(f);
      a += 1;
    }
  }
  this.CurrentRenderMode = CL3D.Scene.RENDER_MODE_TRANSPARENT;
  if (b != null && this.SceneNodesToRenderTransparent.length > 0) {
    this.SceneNodesToRenderTransparent.sort(function(l, i) {
      var m = b.getDistanceFromSQ(l.getAbsolutePosition());
      var k = b.getDistanceFromSQ(i.getAbsolutePosition());
      if (m < k) {
        return 1;
      }
      if (m > k) {
        return-1;
      }
      return 0;
    });
  }
  for (d = 0;d < this.SceneNodesToRenderTransparent.length;++d) {
    var j = this.SceneNodesToRenderTransparent[d];
    if (h == null || h.intersectsWithBox(j.getTransformedBoundingBox())) {
      j.render(f);
      a += 1;
    }
  }
  this.CurrentRenderMode = CL3D.Scene.RENDER_MODE_2DOVERLAY;
  for (d = 0;d < this.Overlay2DToRender.length;++d) {
    this.Overlay2DToRender[d].render(f);
  }
  a += this.Overlay2DToRender.length;
  this.NodeCountRenderedLastTime = a;
  this.StoreViewMatrixForRedrawCheck();
};
CL3D.Scene.prototype.HasViewChangedSinceLastRedraw = function() {
  if (!this.ActiveCamera) {
    return true;
  }
  var a = new CL3D.Matrix4(false);
  this.ActiveCamera.Projection.copyTo(a);
  a = a.multiply(this.ActiveCamera.ViewMatrix);
  return!a.equals(this.LastViewProj);
};
CL3D.Scene.prototype.StoreViewMatrixForRedrawCheck = function() {
  if (!this.ActiveCamera) {
    return;
  }
  this.ActiveCamera.Projection.copyTo(this.LastViewProj);
  this.LastViewProj = this.LastViewProj.multiply(this.ActiveCamera.ViewMatrix);
};
CL3D.Scene.prototype.getLastUsedRenderer = function() {
  return this.LastUsedRenderer;
};
CL3D.Scene.prototype.setBackgroundColor = function(a) {
  this.BackgroundColor = a;
};
CL3D.Scene.prototype.getBackgroundColor = function() {
  return this.BackgroundColor;
};
CL3D.Scene.prototype.getName = function() {
  return this.Name;
};
CL3D.Scene.prototype.setName = function(a) {
  this.Name = a;
};
CL3D.Scene.prototype.setRedrawMode = function(a) {
  this.RedrawMode = a;
};
CL3D.Scene.prototype.setActiveCamera = function(a) {
  this.ActiveCamera = a;
};
CL3D.Scene.prototype.getActiveCamera = function() {
  return this.ActiveCamera;
};
CL3D.Scene.prototype.forceRedrawNextFrame = function() {
  this.ForceRedrawThisFrame = true;
};
CL3D.Scene.prototype.getStartTime = function() {
  return this.StartTime;
};
CL3D.Scene.prototype.registerNodeForRendering = function(a, b) {
  if (b == null) {
    b = CL3D.Scene.RENDER_MODE_DEFAULT;
  }
  switch(b) {
    case CL3D.Scene.RENDER_MODE_SKYBOX:
      this.SkyBoxSceneNode = a;
      break;
    case CL3D.Scene.RENDER_MODE_DEFAULT:
      this.SceneNodesToRender.push(a);
      break;
    case CL3D.Scene.RENDER_MODE_LIGHTS:
      this.LightsToRender.push(a);
      break;
    case CL3D.Scene.RENDER_MODE_CAMERA:
      break;
    case CL3D.Scene.RENDER_MODE_TRANSPARENT:
      this.SceneNodesToRenderTransparent.push(a);
      break;
    case CL3D.Scene.RENDER_MODE_2DOVERLAY:
      this.Overlay2DToRender.push(a);
      break;
  }
};
CL3D.Scene.prototype.getAllSceneNodesOfType = function(b) {
  if (this.RootNode == null) {
    return null;
  }
  var a = new Array;
  this.getAllSceneNodesOfTypeImpl(this.RootNode, b, a);
  return a;
};
CL3D.Scene.prototype.getAllSceneNodesOfTypeImpl = function(g, f, b) {
  if (g.getType() == f) {
    b.push(g);
  }
  for (var d = 0;d < g.Children.length;++d) {
    var e = g.Children[d];
    this.getAllSceneNodesOfTypeImpl(e, f, b);
  }
};
CL3D.Scene.prototype.getAllSceneNodesWithAnimator = function(b) {
  if (this.RootNode == null) {
    return null;
  }
  var a = new Array;
  this.getAllSceneNodesWithAnimatorImpl(this.RootNode, b, a);
  return a;
};
CL3D.Scene.prototype.getAllSceneNodesWithAnimatorImpl = function(f, d, b) {
  if (f.getAnimatorOfType(d) != null) {
    b.push(f);
  }
  for (var c = 0;c < f.Children.length;++c) {
    var e = f.Children[c];
    this.getAllSceneNodesWithAnimatorImpl(e, d, b);
  }
};
CL3D.Scene.prototype.getSceneNodeFromName = function(a) {
  if (this.RootNode == null) {
    return null;
  }
  return this.getSceneNodeFromNameImpl(this.RootNode, a);
};
CL3D.Scene.prototype.getSceneNodeFromNameImpl = function(e, a) {
  if (e.Name == a) {
    return e;
  }
  for (var b = 0;b < e.Children.length;++b) {
    var d = e.Children[b];
    var c = this.getSceneNodeFromNameImpl(d, a);
    if (c) {
      return c;
    }
  }
  return null;
};
CL3D.Scene.prototype.getSceneNodeFromId = function(a) {
  if (this.RootNode == null) {
    return null;
  }
  return this.getSceneNodeFromIdImpl(this.RootNode, a);
};
CL3D.Scene.prototype.getSceneNodeFromIdImpl = function(e, d) {
  if (e.Id == d) {
    return e;
  }
  for (var a = 0;a < e.Children.length;++a) {
    var c = e.Children[a];
    var b = this.getSceneNodeFromIdImpl(c, d);
    if (b) {
      return b;
    }
  }
  return null;
};
CL3D.Scene.prototype.getRootSceneNode = function() {
  return this.RootNode;
};
CL3D.Scene.prototype.registerSceneNodeAnimatorForEvents = function(b) {
  if (b == null) {
    return;
  }
  for (var c = 0;c < this.RegisteredSceneNodeAnimatorsForEventsList.length;++c) {
    var d = this.RegisteredSceneNodeAnimatorsForEventsList[c];
    if (d === b) {
      return;
    }
  }
  this.RegisteredSceneNodeAnimatorsForEventsList.push(b);
};
CL3D.Scene.prototype.unregisterSceneNodeAnimatorForEvents = function(b) {
  if (b == null) {
    return;
  }
  for (var c = 0;c < this.RegisteredSceneNodeAnimatorsForEventsList.length;++c) {
    var d = this.RegisteredSceneNodeAnimatorsForEventsList[c];
    if (d === b) {
      this.RegisteredSceneNodeAnimatorsForEventsList.splice(c, 1);
      return;
    }
  }
};
CL3D.Scene.prototype.postMouseWheelToAnimators = function(c) {
  for (var a = 0;a < this.RegisteredSceneNodeAnimatorsForEventsList.length;++a) {
    var b = this.RegisteredSceneNodeAnimatorsForEventsList[a];
    b.onMouseWheel(c);
  }
};
CL3D.Scene.prototype.postMouseDownToAnimators = function(c) {
  for (var a = 0;a < this.RegisteredSceneNodeAnimatorsForEventsList.length;++a) {
    var b = this.RegisteredSceneNodeAnimatorsForEventsList[a];
    b.onMouseDown(c);
  }
};
CL3D.Scene.prototype.postMouseUpToAnimators = function(c) {
  for (var a = 0;a < this.RegisteredSceneNodeAnimatorsForEventsList.length;++a) {
    var b = this.RegisteredSceneNodeAnimatorsForEventsList[a];
    b.onMouseUp(c);
  }
};
CL3D.Scene.prototype.postMouseMoveToAnimators = function(c) {
  for (var a = 0;a < this.RegisteredSceneNodeAnimatorsForEventsList.length;++a) {
    var b = this.RegisteredSceneNodeAnimatorsForEventsList[a];
    b.onMouseMove(c);
  }
};
CL3D.Scene.prototype.getCollisionGeometry = function() {
  return this.CollisionWorld;
};
CL3D.Scene.prototype.createCollisionGeometry = function(f, g) {
  var d = this.getAllSceneNodesOfType("mesh");
  if (d == null) {
    return null;
  }
  var b = null;
  if (g) {
    g.clear();
    b = g;
  } else {
    b = new CL3D.MetaTriangleSelector;
  }
  for (var e = 0;e < d.length;++e) {
    var c = d[e];
    if (c && c.DoesCollision) {
      var a = null;
      if (c.Selector) {
        a = c.Selector;
      } else {
        if (c.OwnedMesh && c.OwnedMesh.GetPolyCount() > 100) {
          a = new CL3D.OctTreeTriangleSelector(c.OwnedMesh, c);
        } else {
          a = new CL3D.MeshTriangleSelector(c.OwnedMesh, c);
        }
      }
      if (f && c.Selector == null) {
        c.Selector = a;
      }
      b.addSelector(a);
    }
  }
  return b;
};
CL3D.Scene.prototype.addToDeletionQueue = function(b, a) {
  var c = new Object;
  c.node = b;
  c.timeAfterToDelete = a + CL3D.CLTimer.getTime();
  this.DeletionList.push(c);
};
CL3D.Scene.prototype.clearDeletionList = function(f) {
  if (this.DeletionList.length == 0) {
    return false;
  }
  var b = CL3D.CLTimer.getTime();
  var a = false;
  for (var c = 0;c < this.DeletionList.length;) {
    var d = this.DeletionList[c];
    if (f || d.timeAfterToDelete < b) {
      if (d.node.Parent) {
        d.node.Parent.removeChild(d.node);
      }
      this.DeletionList.splice(c, 1);
      a = true;
    } else {
      ++c;
    }
  }
  return a;
};
CL3D.Scene.prototype.isCoordOver2DOverlayNode = function(a, c, b) {
  if (this.RootNode == null || this.LastUsedRenderer == null) {
    return null;
  }
  return this.isCoordOver2DOverlayNodeImpl(this.RootNode, a, c, b);
};
CL3D.Scene.prototype.isCoordOver2DOverlayNodeImpl = function(h, a, g, e) {
  if (h && (h.Visible && (h.getType() == "2doverlay" || h.getType() == "mobile2dinput"))) {
    if (!e || e && h.blocksCameraInput()) {
      var d = h.getScreenCoordinatesRect(true, this.LastUsedRenderer);
      if (d.x <= a && (d.y <= g && (d.x + d.w >= a && d.y + d.h >= g))) {
        return h;
      }
    }
  }
  for (var b = 0;b < h.Children.length;++b) {
    var f = h.Children[b];
    var c = this.isCoordOver2DOverlayNodeImpl(f, a, g, e);
    if (c) {
      return c;
    }
  }
  return null;
};
CL3D.Scene.prototype.getUnusedSceneNodeId = function() {
  for (var b = 0;b < 1E3;++b) {
    var a = Math.round(Math.random() * 1E4 + 10);
    if (this.getSceneNodeFromId(a) == null) {
      return a;
    }
  }
  return-1;
};
CL3D.Scene.REDRAW_WHEN_CAM_MOVED = 2;
CL3D.Scene.REDRAW_WHEN_SCENE_CHANGED = 1;
CL3D.Scene.REDRAW_EVERY_FRAME = 2;
CL3D.Scene.RENDER_MODE_SKYBOX = 1;
CL3D.Scene.RENDER_MODE_DEFAULT = 0;
CL3D.Scene.RENDER_MODE_LIGHTS = 2;
CL3D.Scene.RENDER_MODE_CAMERA = 3;
CL3D.Scene.RENDER_MODE_TRANSPARENT = 4;
CL3D.Scene.RENDER_MODE_2DOVERLAY = 5;
CL3D.PanoramaScene = function() {
  this.init();
};
CL3D.PanoramaScene.prototype = new CL3D.Scene;
CL3D.PanoramaScene.prototype.getSceneType = function() {
  return "panorama";
};
CL3D.Free3dScene = function() {
  this.init();
  this.DefaultCameraPos = new CL3D.Vect3d;
  this.DefaultCameraTarget = new CL3D.Vect3d;
};
CL3D.Free3dScene.prototype = new CL3D.Scene;
CL3D.Free3dScene.prototype.getSceneType = function() {
  return "free";
};
CL3D.FlaceLoader = function() {
  this.Document = null;
  this.Data = null;
  this.Filename = "";
  this.NextTagPos = 0;
  this.TheTextureManager = null;
  this.CursorControl = null;
  this.PathRoot = "";
  this.TheMeshCache = null;
  this.StoredFileContent = null;
  this.LoadedAReloadAction = false;
  this.loadFile = function(b, c, f, e, g) {
    this.Filename = c;
    this.TheTextureManager = f;
    this.CursorControl = g;
    this.TheMeshCache = e;
    if (this.TheTextureManager != null) {
      var h = CL3D.ScriptingInterface.getScriptingInterface();
      h.setTextureManager(f);
    }
    if (b.length == 0) {
      CL3D.gCCDebugOutput.printError("Error: Could not load file '" + c + "'");
      var d = navigator.appVersion;
      if (d != null && d.indexOf("Chrome") != -1) {
        CL3D.gCCDebugOutput.printError("<i>For using local files with Chrome, add the parameter '--allow-file-access-from-files' when starting the browser. Or use Firefox instead.</i>", true);
      }
      return null;
    }
    if (c.indexOf(".ccbjs")) {
      b = CL3D.base64decode(b);
    }
    var a = new CL3D.CCDocument;
    this.Document = a;
    this.setRootPath();
    this.Data = new CL3D.BinaryStream(b);
    if (!this.parseFile()) {
      return null;
    }
    this.StoredFileContent = b;
    return a;
  };
  this.setRootPath = function() {
    var b = this.Filename;
    var a = b.lastIndexOf("/");
    if (a != -1) {
      b = b.substring(0, a + 1);
    }
    this.PathRoot = b;
  };
  this.parseFile = function() {
    var e = this.Data.readSI32();
    if (e != 1701014630) {
      return false;
    }
    var c = this.Data.readSI32();
    var b = this.Data.readUI32();
    var d = 0;
    while (this.Data.bytesAvailable() > 0) {
      var a = this.readTag();
      ++d;
      if (d == 1 && a != 1) {
        return false;
      }
      switch(a) {
        case 1:
          this.readDocument();
          break;
        case 12:
          this.readEmbeddedFiles();
          break;
        default:
          this.SkipToNextTag();
      }
    }
    return true;
  };
  this.SkipToNextTag = function() {
    this.Data.seek(this.NextTagPos, true);
  };
  this.readTag = function() {
    var b = 0;
    b = this.Data.readUnsignedShort();
    var a = 0;
    a = this.Data.readUnsignedInt();
    this.CurrentTagSize = a;
    this.NextTagPos = this.Data.getPosition() + a;
    return b;
  };
  this.ReadMatrix = function() {
    var a = new CL3D.Matrix4(false);
    this.ReadIntoExistingMatrix(a);
    return a;
  };
  this.ReadIntoExistingMatrix = function(a) {
    for (var b = 0;b < 16;++b) {
      a.setByIndex(b, this.Data.readFloat());
    }
  };
  this.ReadQuaternion = function() {
    var a = new CL3D.Quaternion;
    a.W = this.Data.readFloat();
    a.X = this.Data.readFloat();
    a.Y = this.Data.readFloat();
    a.Z = this.Data.readFloat();
    return a;
  };
  this.readUTFBytes = function(g) {
    var c = 0;
    var j = g;
    var h = [];
    var d = [0, 12416, 925824, 63447168, 4194836608, 2181570688];
    var k = [];
    for (var e = 0;e < g;++e) {
      k.push(this.Data.readNumber(1));
    }
    while (c < j) {
      var a = 0;
      var b = this.trailingUTF8Bytes[k[c]];
      if (c + b >= j) {
        return h.join("");
      }
      for (var f = b;f >= 0;--f) {
        a += k[c];
        ++c;
        if (f != 0) {
          a = a << 6;
        }
      }
      if (c > g) {
        break;
      }
      a -= d[b];
      if (a < 1114111) {
        h.push(this.fixedFromCharCode(a));
      } else {
        return h.join("");
      }
    }
    return h.join("");
  };
  this.ReadString = function(b) {
    var a = this.Data.readUnsignedInt();
    if (a > 1024 * 1024 * 100) {
      return "";
    }
    if (a <= 0) {
      return "";
    }
    return this.readUTFBytes(a);
  };
  this.trailingUTF8Bytes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5];
  this.fixedFromCharCode = function(a) {
    if (a > 65535) {
      a -= 65536;
      return String.fromCharCode(55296 + (a >> 10), 56320 + (a & 1023));
    } else {
      return String.fromCharCode(a);
    }
  };
  this.readDocument = function() {
    var d = this.NextTagPos;
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < d) {
      var a = this.readTag();
      switch(a) {
        case 1004:
          this.Document.CurrentScene = this.Data.readInt();
          break;
        case 20:
          this.readPublishSettings();
          break;
        case 2:
          var b = this.Data.readInt();
          var c = null;
          switch(b) {
            case 0:
              c = new CL3D.Free3dScene;
              this.readFreeScene(c);
              break;
            case 1:
              c = new CL3D.PanoramaScene;
              this.readPanoramaScene(c);
              break;
            default:
              this.SkipToNextTag();
          }
          this.Document.addScene(c);
          break;
        default:
          this.SkipToNextTag();
      }
    }
  };
  this.reloadScene = function(i, h, a, b, j, g, k) {
    this.Filename = b;
    this.TheTextureManager = j;
    this.CursorControl = k;
    this.TheMeshCache = g;
    this.Data = new CL3D.BinaryStream(i);
    this.setRootPath();
    this.Data.readSI32();
    this.Data.readSI32();
    this.Data.readUI32();
    var f = -1;
    var l = this.readTag();
    if (l != 1) {
      return null;
    }
    var c = this.NextTagPos;
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < c) {
      var l = this.readTag();
      switch(l) {
        case 2:
          var e = this.Data.readInt();
          ++f;
          if (f == a) {
            var d = null;
            switch(e) {
              case 0:
                d = new CL3D.Free3dScene;
                this.readFreeScene(d);
                break;
              case 1:
                d = new CL3D.PanoramaScene;
                this.readPanoramaScene(d);
                break;
              default:
                this.SkipToNextTag();
            }
            return d;
          } else {
            this.SkipToNextTag();
          }
        ;
        default:
          this.SkipToNextTag();
      }
    }
    return null;
  };
  this.readPublishSettings = function() {
    this.Data.readInt();
    this.Document.ApplicationTitle = this.ReadString();
    var c = this.NextTagPos;
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < c) {
      var a = this.readTag();
      switch(a) {
        case 35:
          this.Data.readInt();
          this.Data.readInt();
          this.Data.readInt();
          this.Data.readInt();
          var b = this.Data.readInt();
          if ((b & 1) != 0) {
            this.Document.WaitUntilTexturesLoaded = true;
          }
          this.SkipToNextTag();
          break;
        case 37:
          var b = this.Data.readInt();
          this.Data.readInt();
          if ((b & 1) != 0) {
            if (CL3D.gCCDebugOutput == null) {
              CL3D.gCCDebugOutput = new CL3D.DebugOutput(elementIdOfCanvas, showFPSCounter);
            } else {
              CL3D.gCCDebugOutput.enableFPSCounter();
            }
          }
          if ((b & 2) != 0) {
            this.Data.readInt();
            this.ReadString();
          }
          break;
        default:
          this.SkipToNextTag();
      }
    }
  };
  this.readFreeScene = function(c) {
    var b = this.NextTagPos;
    this.readScene(c);
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < b) {
      var a = this.readTag();
      switch(a) {
        case 1007:
          c.DefaultCameraPos = this.Read3DVectF();
          c.DefaultCameraTarget = this.Read3DVectF();
          break;
        case 8:
          this.ReadSceneGraph(c);
          break;
        default:
          this.SkipToNextTag();
      }
    }
  };
  this.readPanoramaScene = function(a) {
    this.SkipToNextTag();
  };
  this.Read3DVectF = function() {
    var a = new CL3D.Vect3d;
    a.X = this.Data.readFloat();
    a.Y = this.Data.readFloat();
    a.Z = this.Data.readFloat();
    return a;
  };
  this.ReadColorF = function() {
    var a = new CL3D.ColorF;
    a.R = this.Data.readFloat();
    a.G = this.Data.readFloat();
    a.B = this.Data.readFloat();
    a.A = this.Data.readFloat();
    return a;
  };
  this.ReadColorFAsInt = function() {
    var f = this.Data.readFloat();
    var e = this.Data.readFloat();
    var c = this.Data.readFloat();
    var d = this.Data.readFloat();
    if (f > 1) {
      f = 1;
    }
    if (e > 1) {
      e = 1;
    }
    if (c > 1) {
      c = 1;
    }
    if (d > 1) {
      d = 1;
    }
    return CL3D.createColor(d * 255, f * 255, e * 255, c * 255);
  };
  this.Read2DVectF = function() {
    var a = new CL3D.Vect2d;
    a.X = this.Data.readFloat();
    a.Y = this.Data.readFloat();
    return a;
  };
  this.Read3DBoxF = function() {
    var a = new CL3D.Box3d;
    a.MinEdge = this.Read3DVectF();
    a.MaxEdge = this.Read3DVectF();
    return a;
  };
  this.readScene = function(b) {
    var a = this.readTag();
    if (a == 26) {
      b.Name = this.ReadString();
      b.BackgroundColor = this.Data.readInt();
    } else {
      this.JumpBackFromTagReading();
    }
  };
  this.JumpBackFromTagReading = function() {
    this.Data.position -= 10;
  };
  this.ReadSceneGraph = function(c) {
    var b = this.NextTagPos;
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < b) {
      var a = this.readTag();
      switch(a) {
        case 9:
          this.ReadSceneNode(c, c.RootNode, 0);
          break;
        default:
          this.SkipToNextTag();
      }
    }
  };
  this.ReadSceneNode = function(A, u, B) {
    if (u == null) {
      return;
    }
    var f = this.NextTagPos;
    var d = this.Data.readInt();
    var l = this.Data.readInt();
    var F = this.ReadString();
    var e = this.Read3DVectF();
    var j = this.Read3DVectF();
    var C = this.Read3DVectF();
    var i = this.Data.readBoolean();
    var n = this.Data.readInt();
    var g = null;
    var r = 0;
    if (B == 0) {
      u.Visible = i;
      u.Name = F;
      u.Culling = n;
    }
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < f) {
      var E = this.readTag();
      switch(E) {
        case 9:
          this.ReadSceneNode(A, g ? g : u, B + 1);
          break;
        case 10:
          switch(d) {
            case 2037085030:
              var y = new CL3D.SkyBoxSceneNode;
              y.Type = d;
              y.Pos = e;
              y.Rot = j;
              y.Scale = C;
              y.Visible = i;
              y.Name = F;
              y.Culling = n;
              y.Id = l;
              y.scene = A;
              this.readFlaceMeshNode(y);
              u.addChild(y);
              g = y;
              g.updateAbsolutePosition();
              break;
            case 1752395110:
              var o = new CL3D.MeshSceneNode;
              o.Type = d;
              o.Pos = e;
              o.Rot = j;
              o.Scale = C;
              o.Visible = i;
              o.Name = F;
              o.Culling = n;
              o.Id = l;
              o.scene = A;
              this.readFlaceMeshNode(o);
              u.addChild(o);
              g = o;
              g.updateAbsolutePosition();
              break;
            case 1835950438:
              var z = new CL3D.AnimatedMeshSceneNode;
              z.Type = d;
              z.Pos = e;
              z.Rot = j;
              z.Scale = C;
              z.Visible = i;
              z.Name = F;
              z.Culling = n;
              z.Id = l;
              z.scene = A;
              this.readFlaceAnimatedMeshNode(z);
              u.addChild(z);
              g = z;
              g.updateAbsolutePosition();
              break;
            case 1953526632:
              var w = new CL3D.HotspotSceneNode(this.CursorControl, null);
              w.Type = d;
              w.Pos = e;
              w.Rot = j;
              w.Scale = C;
              w.Visible = i;
              w.Name = F;
              w.Culling = n;
              w.Id = l;
              w.scene = A;
              this.readFlaceHotspotNode(w);
              u.addChild(w);
              g = w;
              g.updateAbsolutePosition();
              break;
            case 1819042406:
              var a = new CL3D.BillboardSceneNode;
              a.Type = d;
              a.Pos = e;
              a.Rot = j;
              a.Scale = C;
              a.Visible = i;
              a.Name = F;
              a.Culling = n;
              a.Id = l;
              a.scene = A;
              this.readFlaceBillBoardNode(a);
              u.addChild(a);
              g = a;
              g.updateAbsolutePosition();
              break;
            case 1835098982:
              var x = new CL3D.CameraSceneNode;
              x.Type = d;
              x.Pos = e;
              x.Rot = j;
              x.Scale = C;
              x.Visible = i;
              x.Name = F;
              x.Culling = n;
              x.scene = A;
              x.Id = l;
              this.readFlaceCameraNode(x);
              u.addChild(x);
              g = x;
              g.updateAbsolutePosition();
              break;
            case 1751608422:
              var k = new CL3D.LightSceneNode;
              k.Type = d;
              k.Pos = e;
              k.Rot = j;
              k.Scale = C;
              k.Visible = i;
              k.Name = F;
              k.Culling = n;
              k.Id = l;
              k.scene = A;
              this.readFlaceLightNode(k);
              u.addChild(k);
              g = k;
              g.updateAbsolutePosition();
              break;
            case 1935946598:
              var m = new CL3D.SoundSceneNode;
              m.Type = d;
              m.Pos = e;
              m.Rot = j;
              m.Scale = C;
              m.Visible = i;
              m.Name = F;
              m.Culling = n;
              m.Id = l;
              m.scene = A;
              this.readFlace3DSoundNode(m);
              u.addChild(m);
              g = m;
              g.updateAbsolutePosition();
              break;
            case 1752461414:
              var D = new CL3D.PathSceneNode;
              D.Type = d;
              D.Pos = e;
              D.Rot = j;
              D.Scale = C;
              D.Visible = i;
              D.Name = F;
              D.Culling = n;
              D.Id = l;
              D.scene = A;
              this.readFlacePathNode(D);
              u.addChild(D);
              g = D;
              g.updateAbsolutePosition();
              break;
            case 1954112614:
              var b = new CL3D.DummyTransformationSceneNode;
              b.Type = d;
              b.Pos = e;
              b.Rot = j;
              b.Scale = C;
              b.Visible = i;
              b.Name = F;
              b.Culling = n;
              b.Id = l;
              b.scene = A;
              b.Box = this.Read3DBoxF();
              for (var q = 0;q < 16;++q) {
                b.RelativeTransformationMatrix.setByIndex(q, this.Data.readFloat());
              }
              u.addChild(b);
              g = b;
              g.updateAbsolutePosition();
              break;
            case 1868837478:
              var t = new CL3D.Overlay2DSceneNode(this.CursorControl);
              t.Type = d;
              t.Pos = e;
              t.Rot = j;
              t.Scale = C;
              t.Visible = i;
              t.Name = F;
              t.Culling = n;
              t.Id = l;
              t.scene = A;
              this.readFlace2DOverlay(t);
              u.addChild(t);
              g = t;
              g.updateAbsolutePosition();
              break;
            case 1668575334:
              var p = new CL3D.ParticleSystemSceneNode;
              p.Type = d;
              p.Pos = e;
              p.Rot = j;
              p.Scale = C;
              p.Visible = i;
              p.Name = F;
              p.Culling = n;
              p.Id = l;
              p.scene = A;
              this.readParticleSystemSceneNode(p);
              u.addChild(p);
              g = p;
              g.updateAbsolutePosition();
              break;
            case 1835283046:
              var v = new CL3D.Mobile2DInputSceneNode(this.CursorControl, A);
              v.Type = d;
              v.Pos = e;
              v.Rot = j;
              v.Scale = C;
              v.Visible = i;
              v.Name = F;
              v.Culling = n;
              v.Id = l;
              v.scene = A;
              this.readFlace2DMobileInput(v);
              u.addChild(v);
              g = v;
              g.updateAbsolutePosition();
              break;
            default:
              if (B == 0) {
                A.AmbientLight = this.ReadColorF();
              }
              this.SkipToNextTag();
              break;
          }
          break;
        case 11:
          var h = this.ReadMaterial();
          if (g && g.getMaterial(r)) {
            g.getMaterial(r).setFrom(h);
          }
          ++r;
          break;
        case 25:
          var c = g;
          if (c == null && B == 0) {
            c = A.getRootSceneNode();
          }
          this.ReadAnimator(c, A);
          break;
        default:
          this.SkipToNextTag();
      }
    }
  };
  this.readFlaceMeshNode = function(c) {
    var d = this.NextTagPos;
    c.Box = this.Read3DBoxF();
    this.Data.readBoolean();
    this.Data.readBoolean();
    c.DoesCollision = this.Data.readBoolean();
    this.Data.readBoolean();
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < d) {
      var b = this.readTag();
      switch(b) {
        case 14:
          var a = this.ReadMesh();
          c.OwnedMesh = a;
          break;
        default:
          this.SkipToNextTag();
      }
    }
  };
  this.ReadMesh = function() {
    var b = new CL3D.Mesh;
    b.Box = this.Read3DBoxF();
    var d = this.NextTagPos;
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < d) {
      var a = this.readTag();
      switch(a) {
        case 15:
          var c = this.ReadMeshBuffer();
          if (c != null) {
            b.AddMeshBuffer(c);
          }
          break;
        default:
          this.SkipToNextTag();
      }
    }
    return b;
  };
  this.ReadMeshBuffer = function() {
    var h = new CL3D.MeshBuffer;
    h.Box = this.Read3DBoxF();
    var a = this.NextTagPos;
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < a) {
      var n = this.readTag();
      switch(n) {
        case 11:
          h.Mat = this.ReadMaterial();
          break;
        case 16:
          var j = Math.floor(this.CurrentTagSize / 2);
          for (var f = 0;f < j;++f) {
            h.Indices.push(this.Data.readShort());
          }
          break;
        case 17:
          var k = Math.floor(this.CurrentTagSize / 36);
          for (var m = 0;m < k;++m) {
            var b = new CL3D.Vertex3D;
            b.Pos = this.Read3DVectF();
            b.Normal = this.Read3DVectF();
            b.Color = this.Data.readInt();
            b.TCoords = this.Read2DVectF();
            b.TCoords2 = new CL3D.Vect2d;
            h.Vertices.push(b);
          }
          break;
        case 18:
          var i = Math.floor(this.CurrentTagSize / 44);
          for (var d = 0;d < i;++d) {
            var g = new CL3D.Vertex3D;
            g.Pos = this.Read3DVectF();
            g.Normal = this.Read3DVectF();
            g.Color = this.Data.readInt();
            g.TCoords = this.Read2DVectF();
            g.TCoords2 = this.Read2DVectF();
            h.Vertices.push(g);
          }
          break;
        case 19:
          var c = this.CurrentTagSize / 60;
          h.Tangents = new Array;
          h.Binormals = new Array;
          for (var l = 0;l < c;++l) {
            var e = new CL3D.Vertex3D;
            e.Pos = this.Read3DVectF();
            e.Normal = this.Read3DVectF();
            e.Color = this.Data.readInt();
            e.TCoords = this.Read2DVectF();
            e.TCoords2 = new CL3D.Vect2d;
            h.Tangents.push(this.Read3DVectF());
            h.Binormals.push(this.Read3DVectF());
            h.Vertices.push(e);
          }
          break;
        default:
          this.SkipToNextTag();
      }
    }
    return h;
  };
  this.ReadMaterial = function() {
    var c = new CL3D.Material;
    c.Type = this.Data.readInt();
    this.Data.readInt();
    this.Data.readInt();
    this.Data.readInt();
    this.Data.readInt();
    this.Data.readFloat();
    this.Data.readInt();
    this.Data.readInt();
    this.Data.readBoolean();
    this.Data.readBoolean();
    c.Lighting = this.Data.readBoolean();
    c.ZWriteEnabled = this.Data.readBoolean();
    this.Data.readByte();
    c.BackfaceCulling = this.Data.readBoolean();
    this.Data.readBoolean();
    this.Data.readBoolean();
    this.Data.readBoolean();
    for (var b = 0;b < 4;++b) {
      var a = this.ReadTextureRef();
      switch(b) {
        case 0:
          c.Tex1 = a;
          break;
        case 1:
          c.Tex2 = a;
          break;
      }
      this.Data.readBoolean();
      this.Data.readBoolean();
      this.Data.readBoolean();
      var d = this.Data.readShort();
      if (d != 0) {
        switch(b) {
          case 0:
            c.ClampTexture1 = true;
            break;
          case 1:
            break;
        }
      }
    }
    return c;
  };
  this.ReadFileStrRef = function() {
    return this.ReadString();
  };
  this.ReadSoundRef = function() {
    var b = this.ReadFileStrRef();
    var a = this.PathRoot + b;
    return CL3D.gSoundManager.getSoundFromSoundName(a, true);
  };
  this.ReadTextureRef = function() {
    var b = this.ReadFileStrRef();
    var a = this.PathRoot + b;
    if (this.TheTextureManager != null && b != "") {
      return this.TheTextureManager.getTexture(a, true);
    }
    return null;
  };
  this.readFlaceHotspotNode = function(b) {
    var c = this.NextTagPos;
    b.Box = this.Read3DBoxF();
    b.Width = this.Data.readInt();
    b.Height = this.Data.readInt();
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < c) {
      var a = this.readTag();
      switch(a) {
        case 3:
          this.readHotspotData(b);
          break;
        default:
          this.SkipToNextTag();
      }
    }
  };
  this.readHotspotData = function(b) {
    var c = this.NextTagPos;
    b.caption = this.ReadString();
    b.TheTexture = this.ReadTextureRef();
    this.Read2DVectF();
    this.Data.readInt();
    b.dateLimit = this.ReadString();
    b.useDateLimit = this.Data.readBoolean();
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < c) {
      var a = this.readTag();
      switch(a) {
        case 6:
          b.bExecuteJavaScript = true;
          b.executeJavaScript = this.ReadString();
          break;
        case 4:
          b.bGotoScene = true;
          b.gotoScene = this.ReadString();
          break;
        case 5:
          b.bOpenWebsite = true;
          b.website = this.ReadString();
          b.websiteTarget = this.ReadString();
          break;
        default:
          this.SkipToNextTag();
      }
    }
  };
  this.readFlaceCameraNode = function(a) {
    a.Box = this.Read3DBoxF();
    a.Target = this.Read3DVectF();
    a.UpVector = this.Read3DVectF();
    a.Fovy = this.Data.readFloat();
    a.Aspect = this.Data.readFloat();
    a.ZNear = this.Data.readFloat();
    a.ZFar = this.Data.readFloat();
    a.Active = this.Data.readBoolean();
    a.recalculateProjectionMatrix();
  };
  this.readFlaceLightNode = function(b) {
    b.Box = this.Read3DBoxF();
    this.Data.readInt();
    b.LightData.Color = this.ReadColorF();
    this.ReadColorF();
    this.Data.readBoolean();
    this.Read3DVectF();
    var a = this.Data.readFloat();
    b.LightData.Radius = a;
    if (a != 0) {
      b.LightData.Attenuation = 1 / a;
    }
  };
  this.readFlaceBillBoardNode = function(b) {
    b.MeshBuffer.Box = this.Read3DBoxF();
    b.Box = b.MeshBuffer.Box;
    b.SizeX = this.Data.readFloat();
    b.SizeY = this.Data.readFloat();
    var a = this.Data.readByte();
    b.IsVertical = (a & 2) != 0;
  };
  this.readFlace3DSoundNode = function(a) {
    a.Box = this.Read3DBoxF();
    a.TheSound = this.ReadSoundRef();
    a.MinDistance = this.Data.readFloat();
    a.MaxDistance = this.Data.readFloat();
    a.PlayMode = this.Data.readInt();
    a.DeleteWhenFinished = this.Data.readBoolean();
    a.MaxTimeInterval = this.Data.readInt();
    a.MinTimeInterval = this.Data.readInt();
    a.Volume = this.Data.readFloat();
    a.PlayAs2D = this.Data.readBoolean();
    this.Data.readInt();
  };
  this.readFlacePathNode = function(a) {
    a.Box = this.Read3DBoxF();
    a.Tightness = this.Data.readFloat();
    a.IsClosedCircle = this.Data.readBoolean();
    this.Data.readInt();
    var b = this.Data.readInt();
    for (var c = 0;c < b;++c) {
      a.Nodes.push(this.Read3DVectF());
    }
  };
  this.readParticleSystemSceneNode = function(b) {
    b.Direction = this.Read3DVectF();
    b.MaxAngleDegrees = this.Data.readInt();
    b.EmittArea = this.Read3DVectF();
    b.MinLifeTime = this.Data.readInt();
    b.MaxLifeTime = this.Data.readInt();
    b.MaxParticles = this.Data.readInt();
    b.MinParticlesPerSecond = this.Data.readInt();
    b.MaxParticlesPerSecond = this.Data.readInt();
    b.MinStartColor = this.Data.readInt();
    b.MaxStartColor = this.Data.readInt();
    b.MinStartSizeX = this.Data.readFloat();
    b.MinStartSizeY = this.Data.readFloat();
    b.MaxStartSizeX = this.Data.readFloat();
    b.MaxStartSizeY = this.Data.readFloat();
    var a = this.Data.readInt();
    if (a & 1) {
      b.FadeOutAffector = true;
      b.FadeOutTime = this.Data.readInt();
      b.FadeTargetColor = this.Data.readInt();
    } else {
      b.FadeOutAffector = false;
    }
    if (a & 2) {
      b.GravityAffector = true;
      b.GravityAffectingTime = this.Data.readInt();
      b.Gravity = this.Read3DVectF();
    } else {
      b.GravityAffector = false;
    }
    if (a & 4) {
      b.ScaleAffector = true;
      b.ScaleToX = this.Data.readFloat();
      b.ScaleToY = this.Data.readFloat();
    } else {
      b.ScaleAffector = false;
    }
  };
  this.readFlace2DMobileInput = function(a) {
    this.Data.readInt();
    a.SizeModeIsAbsolute = this.Data.readBoolean();
    if (a.SizeModeIsAbsolute) {
      a.PosAbsoluteX = this.Data.readInt();
      a.PosAbsoluteY = this.Data.readInt();
      a.SizeAbsoluteWidth = this.Data.readInt();
      a.SizeAbsoluteHeight = this.Data.readInt();
    } else {
      a.PosRelativeX = this.Data.readFloat();
      a.PosRelativeY = this.Data.readFloat();
      a.SizeRelativeWidth = this.Data.readFloat();
      a.SizeRelativeHeight = this.Data.readFloat();
    }
    a.ShowBackGround = this.Data.readBoolean();
    a.BackGroundColor = this.Data.readInt();
    a.Texture = this.ReadTextureRef();
    a.TextureHover = this.ReadTextureRef();
    a.RetainAspectRatio = this.Data.readBoolean();
    a.CursorTex = this.ReadTextureRef();
    a.InputMode = this.Data.readInt();
    if (a.InputMode == 1) {
      a.KeyCode = this.Data.readInt();
    }
  };
  this.readFlace2DOverlay = function(a) {
    this.Data.readInt();
    a.SizeModeIsAbsolute = this.Data.readBoolean();
    if (a.SizeModeIsAbsolute) {
      a.PosAbsoluteX = this.Data.readInt();
      a.PosAbsoluteY = this.Data.readInt();
      a.SizeAbsoluteWidth = this.Data.readInt();
      a.SizeAbsoluteHeight = this.Data.readInt();
    } else {
      a.PosRelativeX = this.Data.readFloat();
      a.PosRelativeY = this.Data.readFloat();
      a.SizeRelativeWidth = this.Data.readFloat();
      a.SizeRelativeHeight = this.Data.readFloat();
    }
    a.ShowBackGround = this.Data.readBoolean();
    a.BackGroundColor = this.Data.readInt();
    a.Texture = this.ReadTextureRef();
    a.TextureHover = this.ReadTextureRef();
    a.RetainAspectRatio = this.Data.readBoolean();
    a.DrawText = this.Data.readBoolean();
    a.TextAlignment = this.Data.readByte();
    a.Text = this.ReadString();
    a.FontName = this.ReadString();
    a.TextColor = this.Data.readInt();
    a.AnimateOnHover = this.Data.readBoolean();
    a.OnHoverSetFontColor = this.Data.readBoolean();
    a.HoverFontColor = this.Data.readInt();
    a.OnHoverSetBackgroundColor = this.Data.readBoolean();
    a.HoverBackgroundColor = this.Data.readInt();
    a.OnHoverDrawTexture = this.Data.readBoolean();
  };
  this.ReadAnimator = function(v, B) {
    if (!v) {
      this.SkipToNextTag();
      return;
    }
    var x;
    var q;
    var d = this.Data.readInt();
    var C = null;
    switch(d) {
      case 100:
        var a = new CL3D.AnimatorRotation;
        a.Rotation = this.Read3DVectF();
        C = a;
        break;
      case 101:
        var p = new CL3D.AnimatorFlyStraight;
        p.Start = this.Read3DVectF();
        p.End = this.Read3DVectF();
        p.TimeForWay = this.Data.readInt();
        p.Loop = this.Data.readBoolean();
        p.recalculateImidiateValues();
        C = p;
        break;
      case 102:
        var l = new CL3D.AnimatorFlyCircle;
        l.Center = this.Read3DVectF();
        l.Direction = this.Read3DVectF();
        l.Radius = this.Data.readFloat();
        l.Speed = this.Data.readFloat();
        l.init();
        C = l;
        break;
      case 103:
        var u = new CL3D.AnimatorCollisionResponse;
        u.Radius = this.Read3DVectF();
        u.Gravity = this.Read3DVectF();
        u.Translation = this.Read3DVectF();
        var g = this.Data.readInt();
        this.Data.readInt();
        this.Data.readInt();
        if (g & 1) {
          u.UseInclination = true;
        }
        u.SlidingSpeed = this.Data.readFloat();
        C = u;
        break;
      case 104:
        var o = v;
        var b = new CL3D.AnimatorCameraFPS(v, this.CursorControl);
        b.MaxVerticalAngle = this.Data.readFloat();
        b.MoveSpeed = this.Data.readFloat();
        b.RotateSpeed = this.Data.readFloat();
        b.JumpSpeed = this.Data.readFloat();
        b.NoVerticalMovement = this.Data.readBoolean();
        var g = this.Data.readInt();
        if (g & 1) {
          b.moveByMouseMove = false;
          b.moveByMouseDown = true;
        } else {
          b.moveByMouseMove = true;
          b.moveByMouseDown = false;
        }
        if (o) {
          b.targetZoomValue = CL3D.radToDeg(o.Fovy);
          b.maxZoom = b.targetZoomValue + 10;
          b.zoomSpeed = (b.maxZoom - b.minZoom) / 50;
        }
        C = b;
        break;
      case 105:
        var c = new CL3D.AnimatorCameraModelViewer(v, this.CursorControl);
        c.Radius = this.Data.readFloat();
        c.RotateSpeed = this.Data.readFloat();
        c.NoVerticalMovement = this.Data.readBoolean();
        var g = this.Data.readInt();
        if (g & 2) {
          c.SlideAfterMovementEnd = true;
          c.SlidingSpeed = this.Data.readFloat();
        }
        if (g & 4) {
          c.AllowZooming = true;
          c.MinZoom = this.Data.readFloat();
          c.MaxZoom = this.Data.readFloat();
          c.ZoomSpeed = this.Data.readFloat();
        }
        C = c;
        break;
      case 106:
        var k = new CL3D.AnimatorFollowPath(B);
        k.TimeNeeded = this.Data.readInt();
        k.LookIntoMovementDirection = this.Data.readBoolean();
        k.PathToFollow = this.ReadString();
        k.OnlyMoveWhenCameraActive = this.Data.readBoolean();
        k.AdditionalRotation = this.Read3DVectF();
        k.EndMode = this.Data.readByte();
        k.CameraToSwitchTo = this.ReadString();
        var g = this.Data.readInt();
        if (g & 1) {
          k.TimeDisplacement = this.Data.readInt();
        }
        if (k.EndMode == 3 || k.EndMode == 4) {
          k.TheActionHandler = this.ReadActionHandlerSection(B);
        }
        C = k;
        break;
      case 107:
        var j = new CL3D.AnimatorOnClick(B, this.CursorControl);
        j.BoundingBoxTestOnly = this.Data.readBoolean();
        j.CollidesWithWorld = this.Data.readBoolean();
        this.Data.readInt();
        j.TheActionHandler = this.ReadActionHandlerSection(B);
        C = j;
        break;
      case 108:
        var e = new CL3D.AnimatorOnProximity(B);
        e.EnterType = this.Data.readInt();
        e.ProximityType = this.Data.readInt();
        e.Range = this.Data.readFloat();
        e.SceneNodeToTest = this.Data.readInt();
        this.Data.readInt();
        e.TheActionHandler = this.ReadActionHandlerSection(B);
        C = e;
        break;
      case 109:
        var f = new CL3D.AnimatorAnimateTexture;
        f.TextureChangeType = this.Data.readInt();
        f.TimePerFrame = this.Data.readInt();
        f.TextureIndexToChange = this.Data.readInt();
        f.Loop = this.Data.readBoolean();
        var n = this.Data.readInt();
        f.Textures = new Array;
        for (var w = 0;w < n;++w) {
          f.Textures.push(this.ReadTextureRef());
        }
        C = f;
        break;
      case 110:
        var j = new CL3D.AnimatorOnMove(B, this.CursorControl);
        j.BoundingBoxTestOnly = this.Data.readBoolean();
        j.CollidesWithWorld = this.Data.readBoolean();
        this.Data.readInt();
        j.ActionHandlerOnLeave = this.ReadActionHandlerSection(B);
        j.ActionHandlerOnEnter = this.ReadActionHandlerSection(B);
        C = j;
        break;
      case 111:
        var r = new CL3D.AnimatorTimer(B);
        r.TickEverySeconds = this.Data.readInt();
        this.Data.readInt();
        r.TheActionHandler = this.ReadActionHandlerSection(B);
        C = r;
        break;
      case 112:
        var A = new CL3D.AnimatorOnKeyPress(B, this.CursorControl);
        A.KeyPressType = this.Data.readInt();
        A.KeyCode = this.Data.readInt();
        A.IfCameraOnlyDoIfActive = this.Data.readBoolean();
        this.Data.readInt();
        A.TheActionHandler = this.ReadActionHandlerSection(B);
        C = A;
        break;
      case 113:
        var h = new CL3D.AnimatorGameAI(B);
        h.AIType = this.Data.readInt();
        h.MovementSpeed = this.Data.readFloat();
        h.ActivationRadius = this.Data.readFloat();
        h.CanFly = this.Data.readBoolean();
        h.Health = this.Data.readInt();
        h.Tags = this.ReadString();
        h.AttacksAIWithTags = this.ReadString();
        h.PatrolRadius = this.Data.readFloat();
        h.RotationSpeedMs = this.Data.readInt();
        h.AdditionalRotationForLooking = this.Read3DVectF();
        h.StandAnimation = this.ReadString();
        h.WalkAnimation = this.ReadString();
        h.DieAnimation = this.ReadString();
        h.AttackAnimation = this.ReadString();
        if (h.AIType == 3) {
          h.PathIdToFollow = this.Data.readInt();
        }
        var g = this.Data.readInt();
        if (g & 1) {
          h.PatrolWaitTimeMs = this.Data.readInt();
        } else {
          h.PatrolWaitTimeMs = 1E4;
          if (h.MovementSpeed != 0) {
            h.PatrolWaitTimeMs = h.PatrolRadius / (h.MovementSpeed / 1E3);
          }
        }
        h.ActionHandlerOnAttack = this.ReadActionHandlerSection(B);
        h.ActionHandlerOnActivate = this.ReadActionHandlerSection(B);
        h.ActionHandlerOnHit = this.ReadActionHandlerSection(B);
        h.ActionHandlerOnDie = this.ReadActionHandlerSection(B);
        C = h;
        break;
      case 114:
        var z = new CL3D.Animator3rdPersonCamera;
        z.SceneNodeIDToFollow = this.Data.readInt();
        z.AdditionalRotationForLooking = this.Read3DVectF();
        z.FollowMode = this.Data.readInt();
        z.FollowSmoothingSpeed = this.Data.readFloat();
        z.TargetHeight = this.Data.readFloat();
        var g = this.Data.readInt();
        if (g & 1) {
          z.CollidesWithWorld = true;
        } else {
          z.CollidesWithWorld = false;
        }
        C = z;
        break;
      case 115:
        var m = new CL3D.AnimatorKeyboardControlled(B, this.CursorControl);
        this.Data.readInt();
        m.RunSpeed = this.Data.readFloat();
        m.MoveSpeed = this.Data.readFloat();
        m.RotateSpeed = this.Data.readFloat();
        m.JumpSpeed = this.Data.readFloat();
        m.AdditionalRotationForLooking = this.Read3DVectF();
        m.StandAnimation = this.ReadString();
        m.WalkAnimation = this.ReadString();
        m.JumpAnimation = this.ReadString();
        m.RunAnimation = this.ReadString();
        var g = this.Data.readInt();
        if (g & 1) {
          m.DisableWithoutActiveCamera = true;
        }
        if (g & 2) {
          m.UseAcceleration = true;
          m.AccelerationSpeed = this.Data.readFloat();
          m.DecelerationSpeed = this.Data.readFloat();
        }
        C = m;
        break;
      case 116:
        var y = new CL3D.AnimatorOnFirstFrame(B);
        y.AlsoOnReload = this.Data.readBoolean();
        this.Data.readInt();
        y.TheActionHandler = this.ReadActionHandlerSection(B);
        C = y;
        break;
      case 117:
        var t = new CL3D.AnimatorExtensionScript(B);
        t.JsClassName = this.ReadString();
        this.Data.readInt();
        this.ReadExtensionScriptProperties(t.Properties, B);
        C = t;
        break;
      default:
        this.SkipToNextTag();
        return;
    }
    if (C) {
      v.addAnimator(C);
    }
  };
  this.ReadExtensionScriptProperties = function(a, b) {
    var d = this.Data.readInt();
    for (var c = 0;c < d;++c) {
      var e = new CL3D.ExtensionScriptProperty;
      e.Type = this.Data.readInt();
      e.Name = this.ReadString();
      switch(e.Type) {
        case 1:
          e.FloatValue = this.Data.readFloat();
          break;
        case 2:
          e.StringValue = this.ReadString();
          break;
        case 6:
          e.VectorValue = this.Read3DVectF();
          break;
        case 7:
          e.TextureValue = this.ReadTextureRef();
          break;
        case 9:
          e.ActionHandlerValue = this.ReadActionHandlerSection(b);
          break;
        case 0:
        ;
        case 4:
        ;
        case 5:
        ;
        case 8:
        ;
        case 3:
        ;
        default:
          e.IntValue = this.Data.readInt();
          break;
      }
      a.push(e);
    }
  };
  this.ReadActionHandlerSection = function(b) {
    var c = this.Data.readInt();
    if (c) {
      var a = new CL3D.ActionHandler(b);
      this.ReadActionHandler(a, b);
      return a;
    }
    return null;
  };
  this.ReadActionHandler = function(c, f) {
    var a = this.readTag();
    if (a != 29) {
      this.SkipToNextTag();
      return;
    }
    var b = this.NextTagPos;
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < b) {
      a = this.readTag();
      if (a == 30) {
        var d = this.Data.readInt();
        var e = this.ReadAction(d, f);
        if (e) {
          c.addAction(e);
        }
      } else {
        this.SkipToNextTag();
      }
    }
  };
  this.readEmbeddedFiles = function() {
    var a = this.NextTagPos;
    while (this.Data.bytesAvailable() > 0 && this.Data.getPosition() < a) {
      var i = this.readTag();
      switch(i) {
        case 13:
          var c = this.Data.readInt();
          var b = this.ReadString();
          var h = this.Data.readInt();
          if (c & 4) {
            var f = this.TheMeshCache.getMeshFromName(b);
            if (f) {
              this.readSkinnedMesh(f, h);
            }
          } else {
            if (c & 8) {
              var g = null;
              try {
                g = this.readUTFBytes(h);
              } catch (d) {
                CL3D.gCCDebugOutput.printError("error reading script: " + d);
              }
              if (g != null) {
                var e = CL3D.ScriptingInterface.getScriptingInterface();
                e.executeCode(g);
              }
            }
          }
          this.SkipToNextTag();
          break;
        default:
          this.SkipToNextTag();
      }
    }
  };
  this.readFlaceAnimatedMeshNode = function(c) {
    c.Box = this.Read3DBoxF();
    this.Data.readBoolean();
    this.Data.readInt();
    var b = this.Data.readInt();
    var a = this.Data.readInt();
    c.FramesPerSecond = this.Data.readFloat();
    this.Data.readByte();
    c.Looping = this.Data.readBoolean();
    this.Data.readInt();
    c.setMesh(this.ReadAnimatedMeshRef(c));
    c.StartFrame = b;
    c.EndFrame = a;
  };
  this.ReadAnimatedMeshRef = function(a) {
    var b = this.ReadFileStrRef();
    var c = this.TheMeshCache.getMeshFromName(b);
    if (c == null) {
      var d = new CL3D.SkinnedMesh;
      d.Name = b;
      this.TheMeshCache.addMesh(d);
      c = d;
    }
    if (a != null && c != null) {
      if (c.AnimatedMeshesToLink == null) {
        c.AnimatedMeshesToLink = new Array;
      }
      c.AnimatedMeshesToLink.push(a);
    }
    return c;
  };
  this.readSkinnedMesh = function(a, n) {
    if (a == null) {
      return;
    }
    this.Data.readInt();
    a.DefaultFPS = this.Data.readFloat();
    var v = this.NextTagPos;
    var w = this.Data.getPosition() + n;
    var m = new Array;
    var t = 0;
    while (this.Data.bytesAvailable() > 0 && (this.Data.getPosition() < v && this.Data.getPosition() < w)) {
      var x = this.readTag();
      if (x == 33) {
        var q = new CL3D.SkinnedMeshJoint;
        q.Name = this.ReadString();
        q.LocalMatrix = this.ReadMatrix();
        q.GlobalInversedMatrix = this.ReadMatrix();
        a.AllJoints.push(q);
        var d = this.Data.readInt();
        m.push(q);
        if (d >= 0 && d < m.length) {
          var u = m[d];
          u.Children.push(q);
        }
        var f = this.Data.readInt();
        for (var o = 0;o < f;++o) {
          q.AttachedMeshes.push(this.Data.readInt());
        }
        var c = this.Data.readInt();
        for (t = 0;t < c;++t) {
          var g = new CL3D.SkinnedMeshPositionKey;
          g.frame = this.Data.readFloat();
          g.position = this.Read3DVectF();
          q.PositionKeys.push(g);
        }
        c = this.Data.readInt();
        for (t = 0;t < c;++t) {
          var b = new CL3D.SkinnedMeshScaleKey;
          b.frame = this.Data.readFloat();
          b.scale = this.Read3DVectF();
          q.ScaleKeys.push(b);
        }
        c = this.Data.readInt();
        for (t = 0;t < c;++t) {
          var r = new CL3D.SkinnedMeshRotationKey;
          r.frame = this.Data.readFloat();
          r.rotation = this.ReadQuaternion();
          q.RotationKeys.push(r);
        }
        c = this.Data.readInt();
        for (t = 0;t < c;++t) {
          var h = new CL3D.SkinnedMeshWeight;
          h.buffer_id = this.Data.readUnsignedShort();
          h.vertex_id = this.Data.readInt();
          h.strength = this.Data.readFloat();
          q.Weights.push(h);
        }
      } else {
        if (x == 15) {
          var p = this.ReadMeshBuffer();
          if (p != null) {
            a.AddMeshBuffer(p);
          }
        } else {
          if (x == 34) {
            var l = new CL3D.NamedAnimationRange;
            l.Name = this.ReadString();
            l.Begin = this.Data.readFloat();
            l.End = this.Data.readFloat();
            l.FPS = this.Data.readFloat();
            a.addNamedAnimationRange(l);
          } else {
            this.SkipToNextTag();
          }
        }
      }
    }
    try {
      a.finalize();
    } catch (e) {
      CL3D.gCCDebugOutput.printError("error finalizing skinned mesh: " + e);
    }
    if (a.AnimatedMeshesToLink && a.AnimatedMeshesToLink.length) {
      for (t = 0;t < a.AnimatedMeshesToLink.length;++t) {
        var k = a.AnimatedMeshesToLink[t];
        if (k) {
          k.setFrameLoop(k.StartFrame, k.EndFrame);
        }
      }
      a.AnimatedMeshesToLink = null;
    }
  };
  this.ReadAction = function(f, v) {
    var k = 0;
    switch(f) {
      case 0:
        var t = new CL3D.Action.MakeSceneNodeInvisible;
        t.InvisibleMakeType = this.Data.readInt();
        t.SceneNodeToMakeInvisible = this.Data.readInt();
        t.ChangeCurrentSceneNode = this.Data.readBoolean();
        this.Data.readInt();
        return t;
      case 1:
        var j = new CL3D.Action.ChangeSceneNodePosition;
        j.PositionChangeType = this.Data.readInt();
        j.SceneNodeToChangePosition = this.Data.readInt();
        j.ChangeCurrentSceneNode = this.Data.readBoolean();
        j.Vector = this.Read3DVectF();
        if (j.PositionChangeType == 4) {
          j.Area3DEnd = this.Read3DVectF();
        }
        j.RelativeToCurrentSceneNode = this.Data.readBoolean();
        j.SceneNodeRelativeTo = this.Data.readInt();
        k = this.Data.readInt();
        if (k & 1) {
          j.UseAnimatedMovement = true;
          j.TimeNeededForMovementMs = this.Data.readInt();
        }
        return j;
      case 2:
        var i = new CL3D.Action.ChangeSceneNodeRotation;
        i.RotationChangeType = this.Data.readInt();
        i.SceneNodeToChangeRotation = this.Data.readInt();
        i.ChangeCurrentSceneNode = this.Data.readBoolean();
        i.Vector = this.Read3DVectF();
        i.RotateAnimated = false;
        k = this.Data.readInt();
        if (k & 1) {
          i.RotateAnimated = true;
          i.TimeNeededForRotationMs = this.Data.readInt();
        }
        return i;
      case 3:
        var h = new CL3D.Action.ChangeSceneNodeScale;
        h.ScaleChangeType = this.Data.readInt();
        h.SceneNodeToChangeScale = this.Data.readInt();
        h.ChangeCurrentSceneNode = this.Data.readBoolean();
        h.Vector = this.Read3DVectF();
        this.Data.readInt();
        return h;
      case 4:
        var g = new CL3D.Action.ChangeSceneNodeTexture;
        g.TextureChangeType = this.Data.readInt();
        g.SceneNodeToChange = this.Data.readInt();
        g.ChangeCurrentSceneNode = this.Data.readBoolean();
        g.TheTexture = this.ReadTextureRef();
        if (g.TextureChangeType == 1) {
          g.IndexToChange = this.Data.readInt();
        }
        this.Data.readInt();
        return g;
      case 5:
        var r = new CL3D.Action.ActionPlaySound;
        k = this.Data.readInt();
        r.PlayLooped = (k & 1) != 0;
        r.TheSound = this.ReadSoundRef();
        r.MinDistance = this.Data.readFloat();
        r.MaxDistance = this.Data.readFloat();
        r.Volume = this.Data.readFloat();
        r.PlayAs2D = this.Data.readBoolean();
        r.SceneNodeToPlayAt = this.Data.readInt();
        r.PlayAtCurrentSceneNode = this.Data.readBoolean();
        r.Position3D = this.Read3DVectF();
        return r;
      case 6:
        var u = new CL3D.Action.ActionStopSound;
        u.SoundChangeType = this.Data.readInt();
        return u;
      case 7:
        var x = new CL3D.Action.ExecuteJavaScript;
        this.Data.readInt();
        x.JScript = this.ReadString();
        return x;
      case 8:
        var z = new CL3D.Action.OpenWebpage;
        this.Data.readInt();
        z.Webpage = this.ReadString();
        z.Target = this.ReadString();
        return z;
      case 9:
        var A = new CL3D.Action.SetSceneNodeAnimation;
        A.SceneNodeToChangeAnim = this.Data.readInt();
        A.ChangeCurrentSceneNode = this.Data.readBoolean();
        A.Loop = this.Data.readBoolean();
        A.AnimName = this.ReadString();
        this.Data.readInt();
        return A;
      case 10:
        var d = new CL3D.Action.SwitchToScene(this.CursorControl);
        d.SceneName = this.ReadString();
        this.Data.readInt();
        return d;
      case 11:
        var n = new CL3D.Action.SetActiveCamera(this.CursorControl);
        n.CameraToSetActive = this.Data.readInt();
        this.Data.readInt();
        return n;
      case 12:
        var l = new CL3D.Action.SetCameraTarget;
        l.PositionChangeType = this.Data.readInt();
        l.SceneNodeToChangePosition = this.Data.readInt();
        l.ChangeCurrentSceneNode = this.Data.readBoolean();
        l.Vector = this.Read3DVectF();
        l.RelativeToCurrentSceneNode = this.Data.readBoolean();
        l.SceneNodeRelativeTo = this.Data.readInt();
        k = this.Data.readInt();
        if (k & 1) {
          l.UseAnimatedMovement = true;
          l.TimeNeededForMovementMs = this.Data.readInt();
        }
        return l;
      case 13:
        var c = new CL3D.Action.Shoot;
        c.ShootType = this.Data.readInt();
        c.Damage = this.Data.readInt();
        c.BulletSpeed = this.Data.readFloat();
        c.SceneNodeToUseAsBullet = this.Data.readInt();
        c.WeaponRange = this.Data.readFloat();
        k = this.Data.readInt();
        if (k & 1) {
          c.SceneNodeToShootFrom = this.Data.readInt();
          c.ShootToCameraTarget = this.Data.readBoolean();
          c.AdditionalDirectionRotation = this.Read3DVectF();
        }
        if (k & 2) {
          c.ActionHandlerOnImpact = this.ReadActionHandlerSection(v);
        }
        if (k & 4) {
          c.ShootDisplacement = this.Read3DVectF();
        }
        return c;
      case 14:
        this.SkipToNextTag();
        return null;
      case 15:
        var o = new CL3D.Action.SetOverlayText;
        this.Data.readInt();
        o.SceneNodeToChange = this.Data.readInt();
        o.ChangeCurrentSceneNode = this.Data.readBoolean();
        o.Text = this.ReadString();
        return o;
      case 16:
        var p = new CL3D.Action.SetOrChangeAVariable;
        this.Data.readInt();
        p.VariableName = this.ReadString();
        p.Operation = this.Data.readInt();
        p.ValueType = this.Data.readInt();
        p.Value = this.ReadString();
        return p;
      case 17:
        var b = new CL3D.Action.IfVariable;
        var k = this.Data.readInt();
        b.VariableName = this.ReadString();
        b.ComparisonType = this.Data.readInt();
        b.ValueType = this.Data.readInt();
        b.Value = this.ReadString();
        b.TheActionHandler = this.ReadActionHandlerSection(v);
        if (k & 1) {
          b.TheElseActionHandler = this.ReadActionHandlerSection(v);
        }
        return b;
      case 18:
        var m = new CL3D.Action.RestartBehaviors;
        m.SceneNodeToRestart = this.Data.readInt();
        m.ChangeCurrentSceneNode = this.Data.readBoolean();
        this.Data.readInt();
        return m;
      case 19:
        var a = new CL3D.Action.ActionStoreLoadVariable;
        this.Data.readInt();
        a.VariableName = this.ReadString();
        a.Load = this.Data.readBoolean();
        return a;
      case 20:
        var y = new CL3D.Action.ActionRestartScene(this.CursorControl);
        this.Data.readInt();
        y.SceneName = this.ReadString();
        this.LoadedAReloadAction = true;
        return y;
      case 22:
        var e = new CL3D.Action.ActionCloneSceneNode;
        e.SceneNodeToClone = this.Data.readInt();
        e.CloneCurrentSceneNode = this.Data.readBoolean();
        this.Data.readInt();
        e.TheActionHandler = this.ReadActionHandlerSection(v);
        return e;
      case 23:
        var q = new CL3D.Action.ActionDeleteSceneNode;
        q.SceneNodeToDelete = this.Data.readInt();
        q.DeleteCurrentSceneNode = this.Data.readBoolean();
        q.TimeAfterDelete = this.Data.readInt();
        this.Data.readInt();
        return q;
      case 24:
        var w = new CL3D.Action.ActionExtensionScript;
        w.JsClassName = this.ReadString();
        this.Data.readInt();
        this.ReadExtensionScriptProperties(w.Properties, v);
        return w;
      default:
        this.SkipToNextTag();
    }
    return null;
  };
};
var vector3d = function(c, b, a) {
  if (!(c === null)) {
    this.x = c;
    this.y = b;
    this.z = a;
  } else {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
};
vector3d.prototype.add = function(a) {
  return new vector3d(this.x + a.x, this.y + a.y, this.z + a.z);
};
vector3d.prototype.substract = function(a) {
  return new vector3d(this.x - a.x, this.y - a.y, this.z - a.z);
};
vector3d.prototype.getLength = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};
vector3d.prototype.normalize = function() {
  var a = this.getLength();
  if (a != 0) {
    a = 1 / a;
    this.x *= a;
    this.y *= a;
    this.z *= a;
  }
};
vector3d.prototype.toString = function() {
  return "(" + this.x + ", " + this.y + ", " + this.z + ")";
};
vector3d.prototype.x = 0;
vector3d.prototype.y = 0;
vector3d.prototype.z = 0;
CL3D.ScriptingInterface = function() {
  this.nUniqueCounterID = -1;
  this.StoredExtensionScriptActionHandlers = new Array;
  this.IsInDrawCallback = false;
  this.CurrentlyActiveScene = null;
  this.CurrentlyRunningExtensionScriptAnimator = null;
  this.TheTextureManager = null;
  this.TheRenderer = null;
  this.Engine = null;
  this.ccbRegisteredFunctionArray = new Array;
};
CL3D.gScriptingInterface = null;
CL3D.ScriptingInterface.getScriptingInterface = function() {
  if (CL3D.gScriptingInterface == null) {
    CL3D.gScriptingInterface = new CL3D.ScriptingInterface;
  }
  return CL3D.gScriptingInterface;
};
CL3D.ScriptingInterface.getScriptingInterfaceReadOnly = function() {
  return CL3D.gScriptingInterface;
};
CL3D.ScriptingInterface.prototype.setTextureManager = function(a) {
  this.TheTextureManager = a;
};
CL3D.ScriptingInterface.prototype.setEngine = function(a) {
  this.Engine = a;
};
CL3D.ScriptingInterface.prototype.needsRedraw = function() {
  return this.ccbRegisteredFunctionArray.length != 0;
};
CL3D.ScriptingInterface.prototype.setCurrentlyRunningExtensionScriptAnimator = function(a) {
  this.CurrentlyRunningExtensionScriptAnimator = a;
};
CL3D.ScriptingInterface.prototype.setActiveScene = function(a) {
  this.CurrentlyActiveScene = a;
};
CL3D.ScriptingInterface.prototype.executeCode = function(code) {
  try {
    eval(code);
  } catch (err) {
    CL3D.gCCDebugOutput.jsConsolePrint(err);
  }
};
CL3D.ScriptingInterface.prototype.getUniqueCounterID = function() {
  ++this.nUniqueCounterID;
  return this.nUniqueCounterID;
};
CL3D.ScriptingInterface.prototype.registerExtensionScriptActionHandler = function(d) {
  for (var c = 0;c < this.StoredExtensionScriptActionHandlers.length;++c) {
    var b = this.StoredExtensionScriptActionHandlers[c];
    if (b === d) {
      return c;
    }
  }
  this.StoredExtensionScriptActionHandlers.push(d);
  return this.StoredExtensionScriptActionHandlers.length - 1;
};
CL3D.ScriptingInterface.prototype.runDrawCallbacks = function(b) {
  this.IsInDrawCallback = true;
  if (this.ccbRegisteredFunctionArray.length != null) {
    this.TheRenderer = b;
    for (var a = 0;a < this.ccbRegisteredFunctionArray.length;++a) {
      this.ccbRegisteredFunctionArray[a]();
    }
    this.TheRenderer = null;
  }
  this.IsInDrawCallback = false;
};
CL3D.ScriptingInterface.prototype.setSceneNodePropertyFromOverlay = function(d, c, b) {
  switch(c) {
    case "Position Mode":
      d.SizeModeIsAbsolute = b == "absolute (pixels)";
      break;
    case "Pos X (percent)":
      d.PosRelativeX = b / 100;
      break;
    case "Pos Y (percent)":
      d.PosRelativeY = b / 100;
      break;
    case "Width (percent)":
      d.SizeAbsoluteWidth = b;
      break;
    case "Height (percent)":
      d.SizeAbsoluteHeight = b;
      break;
    case "Pos X (pixels)":
      d.PosAbsoluteX = b;
      break;
    case "Pos Y (pixels)":
      d.PosAbsoluteY = b;
      break;
    case "Width (pixels)":
      d.SizeRelativeWidth = b / 100;
      break;
    case "Height (pixels)":
      d.SizeRelativeHeight = b / 100;
      break;
    case "Alpha":
      d.BackGroundColor = (b & 255) << 24 | d.BackGroundColor & 16777215;
      break;
    case "Image":
      var a = TheTextureManager.getTextureFromName(b);
      d.Texture = a;
      break;
    case "Background Color":
      d.BackGroundColor = b;
      break;
    case "Draw Text":
      d.DrawText = b ? true : false;
      break;
    case "TextColor":
      d.TextColor = b;
      break;
    case "Text":
      d.Text = b;
      break;
  }
};
CL3D.ScriptingInterface.prototype.getSceneNodePropertyFromOverlay = function(b, a) {
  switch(a) {
    case "Position Mode":
      return b.SizeModeIsAbsolute;
    case "Pos X (percent)":
      return b.PosRelativeX * 100;
    case "Pos Y (percent)":
      return b.PosRelativeY * 100;
    case "Width (percent)":
      return b.SizeAbsoluteWidth;
    case "Height (percent)":
      return b.SizeAbsoluteHeight;
    case "Pos X (pixels)":
      return b.PosAbsoluteX;
    case "Pos Y (pixels)":
      return b.PosAbsoluteY;
    case "Width (pixels)":
      return b.SizeRelativeWidth * 100;
    case "Height (pixels)":
      return b.SizeRelativeHeight * 100;
    case "Alpha":
      return CL3D.getAlpha(b.BackGroundColor);
    case "Image":
      return b.Texture ? b.Texture.Name : null;
    case "Background Color":
      return b.BackGroundColor;
    case "Draw Text":
      return b.DrawText;
    case "TextColor":
      return b.TextColor;
    case "Text":
      return b.Text;
  }
  return null;
};
CL3D.AnimatorExtensionScript = function(a) {
  this.JsClassName = null;
  this.Properties = new Array;
  this.bAcceptsMouseEvents = false;
  this.bAcceptsKeyboardEvents = false;
  this.ScriptIndex = -1;
  this.bIsAttachedToCamera = false;
  this.SMGr = a;
};
CL3D.AnimatorExtensionScript.prototype = new CL3D.Animator;
CL3D.AnimatorExtensionScript.prototype.setAcceptsEvents = function(c, a) {
  this.bAcceptsMouseEvents = c;
  this.bAcceptsKeyboardEvents = a;
  if (!this.bIsAttachedToCamera && this.SMGr) {
    var b = CL3D.ScriptingInterface.getScriptingInterface().Engine;
    if (a) {
      b.registerAnimatorForKeyUp(this);
      b.registerAnimatorForKeyDown(this);
    }
    this.SMGr.registerSceneNodeAnimatorForEvents(this);
  }
};
CL3D.AnimatorExtensionScript.prototype.getType = function() {
  return "extensionscript";
};
CL3D.AnimatorExtensionScript.prototype.createClone = function(d, h, e, g) {
  var b = new CL3D.AnimatorExtensionScript(h);
  b.JsClassName = this.JsClassName;
  for (var c = 0;c < this.Properties.length;++c) {
    var f = this.Properties[c];
    if (f != null) {
      b.Properties.push(f.createClone(e, g));
    } else {
      b.Properties.push(null);
    }
  }
  return b;
};
CL3D.AnimatorExtensionScript.prototype.animateNode = function(d, c) {
  if (d == null) {
    return false;
  }
  if (this.JsClassName == null || this.JsClassName.length == 0) {
    return false;
  }
  var a = CL3D.ScriptingInterface.getScriptingInterface();
  a.setCurrentlyRunningExtensionScriptAnimator(this);
  if (this.ScriptIndex == -1) {
    this.initScript(d, a);
  }
  if (this.ScriptIndex != -1) {
    try {
      _ccbScriptCache[this.ScriptIndex]["onAnimate"](d, c);
    } catch (b) {
      CL3D.gCCDebugOutput.jsConsolePrint(this.JsClassName + ": " + b);
    }
  }
  a.setCurrentlyRunningExtensionScriptAnimator(null);
  return true;
};
CL3D.AnimatorExtensionScript.prototype.initScript = function(f, b) {
  var e = "";
  this.ScriptIndex = b.getUniqueCounterID();
  e += "if (typeof _ccbScriptCache == 'undefined') _ccbScriptCache = new Array(); ";
  e += "_ccbScriptCache[";
  e += this.ScriptIndex;
  e += "] = new ";
  e += this.JsClassName;
  e += "();";
  b.executeCode(e);
  var c = "_ccbScriptCache[";
  c += this.ScriptIndex;
  c += "].";
  e = "try {";
  e += CL3D.ExtensionScriptProperty.generateInitJavaScriptCode(c, this.Properties);
  e += "} catch(e) { }";
  b.executeCode(e);
  var a = false;
  var d = null;
  if (f.getType() == "camera") {
    d = f;
    a = true;
  }
  this.bIsAttachedToCamera = a;
  e = "try { ccbRegisterBehaviorEventReceiver(typeof ";
  e += c;
  e += "onMouseEvent != 'undefined', typeof ";
  e += c;
  e += "onKeyEvent != 'undefined'); } catch(e) { }";
  b.executeCode(e);
};
CL3D.AnimatorExtensionScript.prototype.sendMouseEvent = function(a, b) {
  if (this.bAcceptsMouseEvents) {
    _ccbScriptCache[this.ScriptIndex]["onMouseEvent"](a, b);
  }
};
CL3D.AnimatorExtensionScript.prototype.sendKeyEvent = function(a, b) {
  if (this.bAcceptsKeyboardEvents) {
    _ccbScriptCache[this.ScriptIndex]["onKeyEvent"](a, b);
  }
};
CL3D.AnimatorExtensionScript.prototype.onMouseUp = function(a) {
  this.sendMouseEvent(2, 0);
};
CL3D.AnimatorExtensionScript.prototype.onMouseWheel = function(a) {
  this.sendMouseEvent(1, a);
};
CL3D.AnimatorExtensionScript.prototype.onMouseDown = function(a) {
  this.sendMouseEvent(3, 0);
};
CL3D.AnimatorExtensionScript.prototype.onMouseMove = function(a) {
  this.sendMouseEvent(0, 0);
};
CL3D.AnimatorExtensionScript.prototype.onKeyDown = function(a) {
  this.sendKeyEvent(a.keyCode, true);
};
CL3D.AnimatorExtensionScript.prototype.onKeyUp = function(a) {
  this.sendKeyEvent(a.keyCode, false);
};
CL3D.ExtensionScriptProperty = function() {
  this.Type = -1;
  this.Name = null;
  this.StringValue = null;
  this.VectorValue = null;
  this.FloatValue = 0;
  this.IntValue = 0;
  this.ActionHandlerValue = null;
  this.TextureValue = null;
};
CL3D.ExtensionScriptProperty.prototype.createClone = function(a, d) {
  var b = new CL3D.ExtensionScriptProperty;
  b.Type = this.Type;
  b.Name = this.Name;
  b.StringValue = this.StringValue;
  b.VectorValue = this.VectorValue ? this.VectorValue.clone() : null;
  b.FloatValue = this.FloatValue;
  b.IntValue = this.IntValue;
  if (this.ActionHandlerValue) {
    b.ActionHandlerValue = this.ActionHandlerValue.createClone(a, d);
  }
  b.TextureValue = this.TextureValue;
  return b;
};
CL3D.ExtensionScriptProperty.stringReplace = function(b, c, a) {
  return b.split(c).join(a);
};
CL3D.ExtensionScriptProperty.generateInitJavaScriptCode = function(d, c) {
  var e = "";
  for (var b = 0;b < c.length;++b) {
    var g = c[b];
    if (g == null) {
      continue;
    }
    e += d;
    e += g.Name;
    e += " = ";
    switch(g.Type) {
      case 1:
        e += g.FloatValue;
        e += "; ";
        break;
      case 2:
        e += '"';
        var a = CL3D.ExtensionScriptProperty.stringReplace(g.StringValue, '"', '\\"');
        e += a;
        e += '"; ';
        break;
      case 3:
        e += g.IntValue ? "true" : "false";
        e += "; ";
        break;
      case 6:
        e += "new vector3d(";
        e += g.VectorValue.X;
        e += ", ";
        e += g.VectorValue.Y;
        e += ", ";
        e += g.VectorValue.Z;
        e += "); ";
        break;
      case 7:
        e += '"';
        e += g.TextureValue ? g.TextureValue.Name : "";
        e += '"; ';
        break;
      case 8:
        e += "ccbGetSceneNodeFromId(";
        e += g.IntValue;
        e += "); ";
        break;
      case 9:
        var f = CL3D.ScriptingInterface.getScriptingInterface().registerExtensionScriptActionHandler(g.ActionHandlerValue);
        e += f;
        e += "; ";
        break;
      case 0:
      ;
      case 5:
      ;
      case 4:
      ;
      default:
        e += g.IntValue;
        e += "; ";
        break;
    }
  }
  return e;
};
CL3D.Action.ActionExtensionScript = function() {
  this.Type = "ExtensionScript";
  this.Properties = new Array;
  this.JsClassName = null;
};
CL3D.Action.ActionExtensionScript.prototype.createClone = function(d, f) {
  var b = new CL3D.Action.ActionExtensionScript;
  b.JsClassName = this.JsClassName;
  for (var c = 0;c < this.Properties.length;++c) {
    var e = this.Properties[c];
    if (e != null) {
      b.Properties.push(e.createClone(d, f));
    } else {
      b.Properties.push(null);
    }
  }
  return b;
};
CL3D.Action.ActionExtensionScript.prototype.execute = function(b, a) {
  if (this.JsClassName == null || (this.JsClassName.length == 0 || b == null)) {
    return;
  }
  var c = CL3D.ScriptingInterface.getScriptingInterface();
  var e = "";
  e = "_ccbScriptTmp = new ";
  e += this.JsClassName;
  e += "();";
  c.executeCode(e);
  var d = "_ccbScriptTmp.";
  e = "try { ";
  e += CL3D.ExtensionScriptProperty.generateInitJavaScriptCode(d, this.Properties);
  e += "} catch(e) { }";
  c.executeCode(e);
  e = "try { _ccbScriptTmp.execute(ccbGetSceneNodeFromId(";
  e += b.Id;
  e += ")); } catch(e) { }";
  c.executeCode(e);
};
function ccbGetSceneNodeFromId(b) {
  var a = CL3D.gScriptingInterface.CurrentlyActiveScene;
  if (a == null) {
    return null;
  }
  return a.getSceneNodeFromId(b);
}
function ccbCloneSceneNode(c) {
  var d = CL3D.gScriptingInterface.CurrentlyActiveScene;
  if (c == null) {
    return null;
  }
  var e = c.Id;
  var b = d.getUnusedSceneNodeId();
  var a = c.createClone(c.Parent, e, b);
  if (a != null) {
    a.Id = b;
  }
  return a;
}
function ccbGetActiveCamera() {
  var a = CL3D.gScriptingInterface.CurrentlyActiveScene;
  if (a == null) {
    return null;
  }
  return a.getActiveCamera();
}
function ccbSetActiveCamera(a) {
  var b = CL3D.gScriptingInterface.CurrentlyActiveScene;
  if (b == null) {
    return;
  }
  if (a != null && a.getType() == "camera") {
    b.setActiveCamera(a);
  }
}
function ccbGetChildSceneNode(b, a) {
  if (b == null) {
    return-1;
  }
  if (a < 0 || a >= b.Children.length) {
    return null;
  }
  return b.Children[a];
}
function ccbGetRootSceneNode() {
  var a = CL3D.gScriptingInterface.CurrentlyActiveScene;
  if (a == null) {
    return null;
  }
  return a.getRootSceneNode();
}
function ccbGetSceneNodeChildCount(a) {
  if (a == null) {
    return 0;
  }
  return a.Children.length;
}
function ccbGetSceneNodeFromName(b) {
  var a = CL3D.gScriptingInterface.CurrentlyActiveScene;
  if (a == null) {
    return null;
  }
  return a.getSceneNodeFromName(b);
}
function ccbRemoveSceneNode(a) {
  var b = CL3D.gScriptingInterface.CurrentlyActiveScene;
  if (b == null) {
    return;
  }
  b.addToDeletionQueue(a, 0);
}
function ccbGetSceneNodeMaterialCount(a) {
  if (a == null) {
    return 0;
  }
  return a.getMaterialCount();
}
function ccbGetSceneNodeMaterialProperty(c, b, d) {
  if (c == null) {
    return null;
  }
  if (b < 0 || b >= c.getMaterialCount()) {
    return null;
  }
  var a = c.getMaterial(b);
  if (a == null) {
    return null;
  }
  if (d == "Type") {
    switch(a.Type) {
      case 0:
        return "solid";
      case 2:
        return "lightmap";
      case 3:
        return "lightmap_add";
      case 4:
        return "lightmap_m2";
      case 5:
        return "lightmap_m4";
      case 11:
        return "reflection_2layer";
      case 12:
        return "trans_add";
      case 13:
        return "trans_alphach";
      case 16:
        return "trans_reflection_2layer";
    }
  } else {
    if (d == "Texture1") {
      return a.Tex1 == null ? "" : a.Tex1.Name;
    } else {
      if (d == "Texture2") {
        return a.Tex2 == null ? "" : a.Tex2.Name;
      } else {
        if (d == "Lighting") {
          return a.Lighting;
        } else {
          if (d == "Backfaceculling") {
            return a.Backfaceculling;
          }
        }
      }
    }
  }
  return null;
}
function ccbCleanMemory() {
}
function ccbSetSceneNodeMaterialProperty(a, e, c, f, d, b) {
  if (a == null) {
    return;
  }
  if (e < 0 || e >= a.getMaterialCount()) {
    return;
  }
  var k = a.getMaterial(e);
  if (k == null) {
    return;
  }
  var h = f;
  var j = typeof f == "string" ? f : null;
  var i = null;
  var g = CL3D.ScriptingInterface.getScriptingInterface();
  if (c == "Type") {
    switch(j) {
      case "solid":
        k.Type = 0;
        break;
      case "lightmap":
      ;
      case "lightmap_add":
      ;
      case "lightmap_m2":
      ;
      case "lightmap_m4":
        k.Type = 2;
        break;
      case "reflection_2layer":
        k.Type = 11;
        break;
      case "trans_add":
        k.Type = 12;
        break;
      case "trans_alphach":
        k.Type = 13;
        break;
      case "trans_reflection_2layer":
        k.Type = 16;
        break;
    }
  } else {
    if (c == "Texture1") {
      if (j != null && g.TheTextureManager != null) {
        i = g.TheTextureManager.getTextureFromName(j);
        if (i != null) {
          k.Tex1 = i;
        }
      }
    } else {
      if (c == "Texture2") {
        if (j != null && g.TheTextureManager != null) {
          i = g.TheTextureManager.getTextureFromName(j);
          if (i != null) {
            k.Tex2 = i;
          }
        }
      } else {
        if (c == "Lighting") {
          k.Lighting = h;
        } else {
          if (c == "Backfaceculling") {
            k.Backfaceculling = h;
          }
        }
      }
    }
  }
}
function ccbSetSceneNodeProperty(c, d, g, f, e) {
  if (c == null) {
    return;
  }
  var l = g;
  var m = 0;
  var k = 0;
  var j = 0;
  if (f == null && (l != null && typeof l.x != "undefined")) {
    m = l.x;
    k = l.y;
    j = l.z;
  }
  if (f != null && e != null) {
    m = g;
    k = f;
    j = e;
  }
  var a = null;
  var b = null;
  var n = null;
  var h = null;
  var i = c.getType();
  if (i == "camera") {
    a = c;
  } else {
    if (i == "animatedmesh") {
      b = c;
    } else {
      if (i == "light") {
        n = c;
      } else {
        if (i == "2doverlay") {
          h = c;
        }
      }
    }
  }
  if (d == "Visible") {
    c.Visible = l;
  } else {
    if (d == "Position") {
      c.Pos.X = m;
      c.Pos.Y = k;
      c.Pos.Z = j;
    } else {
      if (d == "Rotation") {
        c.Rot.X = m;
        c.Rot.Y = k;
        c.Rot.Z = j;
      } else {
        if (d == "Scale") {
          c.Scale.X = m;
          c.Scale.Y = k;
          c.Scale.Z = j;
        } else {
          if (h != null) {
            CL3D.ScriptingInterface.getScriptingInterface().setSceneNodePropertyFromOverlay(h, d, g);
          } else {
            if (d == "Target") {
              if (a != null) {
                a.setTarget(new CL3D.Vect3d(m, k, j));
              }
            } else {
              if (d == "UpVector") {
                if (a != null) {
                  a.UpVector = new CL3D.Vect3d(m, k, j);
                }
              } else {
                if (d == "FieldOfView_Degrees") {
                  if (a != null) {
                    a.setFov(CL3D.degToRad(l));
                  }
                } else {
                  if (d == "AspectRatio") {
                    if (a != null) {
                      a.setAspectRatio(l);
                    }
                  } else {
                    if (d == "Animation") {
                      if (b != null) {
                        b.setAnimationByEditorName(l, b.Looping);
                      }
                    } else {
                      if (d == "Looping") {
                        if (b != null) {
                          b.setLoopMode(l);
                        }
                      } else {
                        if (d == "FramesPerSecond") {
                          if (b != null) {
                            b.setAnimationSpeed(l * 0.001);
                          }
                        } else {
                          if (d == "Radius") {
                            if (n != null) {
                              n.LightData.Radius = l;
                            }
                          } else {
                            if (d == "Name") {
                              c.Name = l;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
function ccbGetSceneNodeProperty(c, e) {
  if (c == null) {
    return null;
  }
  var d = null;
  var b = null;
  var g = null;
  var f = null;
  var a = c.getType();
  if (a == "camera") {
    d = c;
  } else {
    if (a == "animatedmesh") {
      b = c;
    } else {
      if (a == "light") {
        g = c;
      } else {
        if (a == "2doverlay") {
          f = c;
        }
      }
    }
  }
  if (e == "Visible") {
    return c.Visible;
  } else {
    if (e == "Position") {
      return new vector3d(c.Pos.X, c.Pos.Y, c.Pos.Z);
    } else {
      if (e == "Rotation") {
        return new vector3d(c.Rot.X, c.Rot.Y, c.Rot.Z);
      } else {
        if (e == "Scale") {
          return new vector3d(c.Scale.X, c.Scale.Y, c.Scale.Z);
        } else {
          if (f != null) {
            return CL3D.ScriptingInterface.getScriptingInterface().getSceneNodePropertyFromOverlay(f, e);
          } else {
            if (e == "Target") {
              return new vector3d(d.Target.X, d.Target.Y, d.Target.Z);
            } else {
              if (e == "UpVector") {
                if (d != null) {
                  return new vector3d(d.UpVector.X, d.UpVector.Y, d.UpVector.Z);
                }
              } else {
                if (e == "FieldOfView_Degrees") {
                  if (d != null) {
                    return CL3D.radToDeg(d.Fovy);
                  }
                } else {
                  if (e == "AspectRatio") {
                    if (d != null) {
                      return d.Aspect;
                    }
                  } else {
                    if (e == "Animation") {
                      return "";
                    } else {
                      if (e == "Looping") {
                        if (b != null) {
                          return b.Looping;
                        }
                      } else {
                        if (e == "FramesPerSecond") {
                          if (b != null) {
                            return b.FramesPerSecond * 1E3;
                          }
                        } else {
                          if (e == "Radius") {
                            if (g != null) {
                              return g.LightData.Radius;
                            }
                          } else {
                            if (e == "Name") {
                              return c.Name;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return null;
}
function ccbSetSceneNodePositionWithoutCollision(e, c, g, f) {
  if (e == null) {
    return;
  }
  e.Pos.X = c;
  e.Pos.Y = g;
  e.Pos.Z = f;
  for (var b = 0;b < e.Animators.length;++b) {
    var d = e.Animators[b];
    if (d != null && d.getType() == "collisionresponse") {
      d.reset();
    }
  }
}
function ccbRegisterOnFrameEvent(b) {
  var a = CL3D.ScriptingInterface.getScriptingInterface();
  a.ccbRegisteredFunctionArray.push(b);
}
function ccbUnregisterOnFrameEvent(c) {
  var a = CL3D.ScriptingInterface.getScriptingInterface();
  var b = a.ccbRegisteredFunctionArray.indexOf(c);
  if (b == -1) {
    return;
  }
  a.ccbRegisteredFunctionArray.splice(b, 1);
}
function ccbDrawColoredRectangle(g, a, f, b, d) {
  var e = CL3D.ScriptingInterface.getScriptingInterface();
  if (!e.IsInDrawCallback || e.TheRenderer == null) {
    return;
  }
  e.TheRenderer.draw2DRectangle(a, f, b - a, d - f, g, true);
}
function ccbDrawTextureRectangle(e, a, g, b, c) {
  var d = CL3D.ScriptingInterface.getScriptingInterface();
  if (!d.IsInDrawCallback || d.TheRenderer == null) {
    return;
  }
  d.TheRenderer.draw2DRectangle(a, g, b - a, c - g, 4278190080, true);
}
function ccbDrawTextureRectangleWithAlpha(e, a, g, b, c) {
  var d = CL3D.ScriptingInterface.getScriptingInterface();
  if (!d.IsInDrawCallback || d.TheRenderer == null) {
    return;
  }
  d.TheRenderer.draw2DRectangle(a, g, b - a, c - g, 4278190080, true);
}
function ccbGet3DPosFrom2DPos(a, d) {
  var c = CL3D.ScriptingInterface.getScriptingInterface().Engine;
  var b = c.get3DPositionFrom2DPosition(a, d);
  if (b != null) {
    return new vector3d(b.X, b.Y, b.Z);
  }
  return null;
}
function ccbGet2DPosFrom3DPos(a, e, d) {
  var c = CL3D.ScriptingInterface.getScriptingInterface().Engine;
  var b = c.get2DPositionFrom3DPosition(new CL3D.Vect3d(a, e, d));
  return new vector3d(b.X, b.Y, 0);
}
function ccbGetCollisionPointOfWorldWithLine(e, c, b, k, j, i) {
  var h = new CL3D.Line3d;
  h.Start = new CL3D.Vect3d(e, c, b);
  h.End = new CL3D.Vect3d(k, j, i);
  var d = CL3D.gScriptingInterface.CurrentlyActiveScene;
  var f = CL3D.AnimatorOnClick.prototype.static_getDistanceToNearestCollisionPointWithWorld(d, h.Start, h.End, d.CollisionWorld, true);
  if (f < 999999999) {
    var a = h.getVector();
    a.setLength(f);
    var g = h.Start.add(a);
    return new vector3d(g.X, g.Y, g.Z);
  }
  return null;
}
function ccbDoesLineCollideWithBoundingBoxOfSceneNode(a, e, d, c, i, h, g) {
  if (a == null) {
    return false;
  }
  if (a.AbsoluteTransformation == null) {
    return false;
  }
  var f = new CL3D.Vect3d(e, d, c);
  var b = new CL3D.Vect3d(i, h, g);
  return s.getTransformedBoundingBox().intersectsWithLine(f, b);
}
function ccbEndProgram() {
}
function ccbLoadTexture() {
  return false;
}
function ccbGetMousePosX() {
  var a = CL3D.ScriptingInterface.getScriptingInterface().Engine;
  if (a) {
    return a.getMouseX();
  }
  return 0;
}
function ccbGetMousePosY() {
  var a = CL3D.ScriptingInterface.getScriptingInterface().Engine;
  if (a) {
    return a.getMouseY();
  }
  return 0;
}
function ccbGetScreenWidth() {
  var a = CL3D.ScriptingInterface.getScriptingInterface().Engine;
  if (a != null && a.getRenderer()) {
    return a.getRenderer().getWidth();
  }
  return 0;
}
function ccbGetScreenHeight() {
  var a = CL3D.ScriptingInterface.getScriptingInterface().Engine;
  if (a != null && a.getRenderer()) {
    return a.getRenderer().getHeight();
  }
  return 0;
}
function ccbSetCloseOnEscapePressed() {
}
function ccbSetCursorVisible() {
}
function ccbSwitchToScene(a) {
  var b = CL3D.ScriptingInterface.getScriptingInterface().Engine;
  if (b != null) {
    return b.gotoSceneByName(a, true);
  }
  return false;
}
function ccbPlaySound(c) {
  var b = CL3D.gSoundManager;
  var a = b.getSoundFromName(c);
  if (a != null) {
    b.play2D(a, false, 1);
  }
}
function ccbGetCopperCubeVariable(a) {
  var c = CL3D.gScriptingInterface.CurrentlyActiveScene;
  var b = CL3D.CopperCubeVariable.getVariable(a, true, c);
  if (b == null) {
    return null;
  }
  if (b.isString()) {
    return b.getValueAsString();
  }
  if (b.isInt()) {
    return b.getValueAsInt();
  }
  if (b.isFloat()) {
    return b.getValueAsFloat();
  }
  return null;
}
function ccbSetCopperCubeVariable(a, b) {
  var d = CL3D.gScriptingInterface.CurrentlyActiveScene;
  var c = CL3D.CopperCubeVariable.getVariable(a, true, d);
  if (c == null) {
    return;
  }
  if (typeof b == "number") {
    c.setValueAsFloat(b);
  } else {
    c.setValueAsString(s);
  }
  CL3D.CopperCubeVariable.saveContentOfPotentialTemporaryVariableIntoSource(c, d);
}
function ccbReadFileContent(a) {
  return null;
}
function ccbWriteFileContent(a, b) {
}
function ccbGetPlatform() {
  return "webgl";
}
function ccbInvokeAction(e, c) {
  var d = CL3D.gScriptingInterface.CurrentlyActiveScene;
  if (d == null) {
    return;
  }
  if (c == null) {
    c = d.getRootSceneNode();
  }
  if (e >= 0 && e < CL3D.gScriptingInterface.StoredExtensionScriptActionHandlers.length) {
    var b = CL3D.gScriptingInterface.StoredExtensionScriptActionHandlers[e];
    if (b != null) {
      b.execute(c);
    }
  }
}
function print(a) {
  CL3D.gCCDebugOutput.jsConsolePrint(a);
}
function system(a) {
}
function ccbRegisterBehaviorEventReceiver(b, a) {
  if (CL3D.gScriptingInterface.CurrentlyRunningExtensionScriptAnimator != null) {
    CL3D.gScriptingInterface.CurrentlyRunningExtensionScriptAnimator.setAcceptsEvents(b, a);
  }
}
CL3D.CCDocument = function() {
  this.CurrentScene = -1;
  this.ApplicationTitle = "";
  this.Scenes = new Array;
  this.UpdateMode = CL3D.Scene.REDRAW_EVERY_FRAME;
  this.WaitUntilTexturesLoaded = false;
  this.CanvasWidth = 320;
  this.CanvasHeight = 200;
  this.addScene = function(a) {
    this.Scenes.push(a);
  };
  this.getCurrentScene = function(a) {
    if (this.CurrentScene < 0 || this.CurrentScene >= this.Scenes.length) {
      return null;
    }
    return this.Scenes[this.CurrentScene];
  };
  this.setCurrentScene = function(b) {
    for (var a = 0;a < this.Scenes.length;++a) {
      if (this.Scenes[a] === b) {
        this.CurrentScene = a;
        return;
      }
    }
  };
};
CL3D.base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 
48, 49, 50, 51, -1, -1, -1, -1, -1);
CL3D.base64decode = function(j) {
  var f, d, b, a;
  var g, h, e;
  var c = CL3D.base64DecodeChars;
  h = j.length;
  g = 0;
  e = "";
  while (g < h) {
    do {
      f = c[j.charCodeAt(g++) & 255];
    } while (g < h && f == -1);
    if (f == -1) {
      break;
    }
    do {
      d = c[j.charCodeAt(g++) & 255];
    } while (g < h && d == -1);
    if (d == -1) {
      break;
    }
    e += String.fromCharCode(f << 2 | (d & 48) >> 4);
    do {
      b = j.charCodeAt(g++) & 255;
      if (b == 61) {
        return e;
      }
      b = c[b];
    } while (g < h && b == -1);
    if (b == -1) {
      break;
    }
    e += String.fromCharCode((d & 15) << 4 | (b & 60) >> 2);
    do {
      a = j.charCodeAt(g++) & 255;
      if (a == 61) {
        return e;
      }
      a = c[a];
    } while (g < h && a == -1);
    if (a == -1) {
      break;
    }
    e += String.fromCharCode((b & 3) << 6 | a);
  }
  return e;
};
CL3D.TriangleSelector = function() {
};
CL3D.TriangleSelector.prototype.getAllTriangles = function(a, b) {
};
CL3D.TriangleSelector.prototype.getTrianglesInBox = function(c, a, b) {
  this.getAllTriangles(a, b);
};
CL3D.TriangleSelector.prototype.getCollisionPointWithLine = function(e, d, f, m, a) {
  if (!e || !d) {
    return null;
  }
  if (this.Node != null && (a && this.Node.Visible == false)) {
    return null;
  }
  var h = new CL3D.Box3d;
  h.MinEdge = e.clone();
  h.MaxEdge = e.clone();
  h.addInternalPointByVector(d);
  var l = new Array;
  this.getTrianglesInBox(h, null, l);
  var c = d.substract(e);
  c.normalize();
  var g;
  var b = 9.999999999E8;
  var k = d.substract(e).getLengthSQ();
  var w = Math.min(e.X, d.X);
  var u = Math.max(e.X, d.X);
  var t = Math.min(e.Y, d.Y);
  var r = Math.max(e.Y, d.Y);
  var q = Math.min(e.Z, d.Z);
  var p = Math.max(e.Z, d.Z);
  var x = null;
  for (var o = 0;o < l.length;++o) {
    var n = l[o];
    if (f && !n.getPlane().isFrontFacing(c)) {
      continue;
    }
    if (w > n.pointA.X && (w > n.pointB.X && w > n.pointC.X)) {
      continue;
    }
    if (u < n.pointA.X && (u < n.pointB.X && u < n.pointC.X)) {
      continue;
    }
    if (t > n.pointA.Y && (t > n.pointB.Y && t > n.pointC.Y)) {
      continue;
    }
    if (r < n.pointA.Y && (r < n.pointB.Y && r < n.pointC.Y)) {
      continue;
    }
    if (q > n.pointA.Z && (q > n.pointB.Z && q > n.pointC.Z)) {
      continue;
    }
    if (p < n.pointA.Z && (p < n.pointB.Z && p < n.pointC.Z)) {
      continue;
    }
    if (e.getDistanceFromSQ(n.pointA) >= b && (e.getDistanceFromSQ(n.pointB) >= b && e.getDistanceFromSQ(n.pointC) >= b)) {
      continue;
    }
    g = n.getIntersectionWithLine(e, c);
    if (g) {
      var v = g.getDistanceFromSQ(e);
      var j = g.getDistanceFromSQ(d);
      if (v < k && (j < k && v < b)) {
        b = v;
        if (m) {
          n.copyTo(m);
        }
        x = g;
      }
    }
  }
  if (x) {
    return x.clone();
  }
  return null;
};
CL3D.TriangleSelector.prototype.getRelatedSceneNode = function() {
  return null;
};
CL3D.TriangleSelector.prototype.setNodeToIgnore = function(a) {
};
CL3D.MeshTriangleSelector = function(k, i) {
  if (!k) {
    return;
  }
  this.Node = i;
  this.Triangles = new Array;
  for (var g = 0;g < k.MeshBuffers.length;++g) {
    var h = k.MeshBuffers[g];
    if (h) {
      var c = h.Indices.length;
      for (var a = 0;a < c;a += 3) {
        var f = h.Vertices[h.Indices[a]];
        var e = h.Vertices[h.Indices[a + 1]];
        var d = h.Vertices[h.Indices[a + 2]];
        this.Triangles.push(new CL3D.Triangle3d(f.Pos, e.Pos, d.Pos));
      }
    }
  }
};
CL3D.MeshTriangleSelector.prototype = new CL3D.TriangleSelector;
CL3D.MeshTriangleSelector.prototype.getAllTriangles = function(a, d) {
  if (!this.Node.AbsoluteTransformation) {
    return;
  }
  var c;
  if (a) {
    c = a.multiply(this.Node.AbsoluteTransformation);
  } else {
    c = this.Node.AbsoluteTransformation;
  }
  var b;
  if (c.isIdentity()) {
    for (b = 0;b < this.Triangles.length;++b) {
      d.push(this.Triangles[b]);
    }
  } else {
    if (c.isTranslateOnly()) {
      for (b = 0;b < this.Triangles.length;++b) {
        d.push(new CL3D.Triangle3d(c.getTranslatedVect(this.Triangles[b].pointA), c.getTranslatedVect(this.Triangles[b].pointB), c.getTranslatedVect(this.Triangles[b].pointC)));
      }
    } else {
      for (b = 0;b < this.Triangles.length;++b) {
        d.push(new CL3D.Triangle3d(c.getTransformedVect(this.Triangles[b].pointA), c.getTransformedVect(this.Triangles[b].pointB), c.getTransformedVect(this.Triangles[b].pointC)));
      }
    }
  }
};
CL3D.MeshTriangleSelector.prototype.getTrianglesInBox = function(c, a, b) {
  this.getAllTriangles(a, b);
};
CL3D.MeshTriangleSelector.prototype.getRelatedSceneNode = function() {
  return this.Node;
};
CL3D.MetaTriangleSelector = function() {
  this.Selectors = new Array;
  this.NodeToIgnore = null;
};
CL3D.MetaTriangleSelector.prototype = new CL3D.TriangleSelector;
CL3D.MetaTriangleSelector.prototype.getAllTriangles = function(b, d) {
  var a = this.NodeToIgnore;
  for (var c = 0;c < this.Selectors.length;++c) {
    var e = this.Selectors[c];
    if (a != null && a == e.getRelatedSceneNode()) {
      continue;
    }
    e.getAllTriangles(b, d);
  }
};
CL3D.MetaTriangleSelector.prototype.getTrianglesInBox = function(e, b, d) {
  var a = this.NodeToIgnore;
  for (var c = 0;c < this.Selectors.length;++c) {
    var f = this.Selectors[c];
    if (a != null && a == f.getRelatedSceneNode()) {
      continue;
    }
    f.getTrianglesInBox(e, b, d);
  }
};
CL3D.MetaTriangleSelector.prototype.addSelector = function(a) {
  this.Selectors.push(a);
};
CL3D.MetaTriangleSelector.prototype.clear = function() {
  this.Selectors = new Array;
};
CL3D.MetaTriangleSelector.prototype.getCollisionPointWithLine = function(a, d, e, j, h) {
  var c = 9.999999999E8;
  var b = null;
  var k = null;
  if (j) {
    k = new CL3D.Triangle3d;
  }
  for (var g = 0;g < this.Selectors.length;++g) {
    var l = this.Selectors[g].getCollisionPointWithLine(a, d, e, k, h);
    if (l != null) {
      var f = l.getDistanceFromSQ(a);
      if (f < c) {
        b = l.clone();
        c = f;
        if (j) {
          k.copyTo(j);
        }
      }
    }
  }
  return b;
};
CL3D.MetaTriangleSelector.prototype.setNodeToIgnore = function(a) {
  this.NodeToIgnore = a;
};
CL3D.SOctTreeNode = function() {
  this.Triangles = new Array;
  this.Box = new CL3D.Box3d;
  this.Child = new Array;
};
CL3D.OctTreeTriangleSelector = function(m, k, g) {
  this.DebugNodeCount = 0;
  this.DebugPolyCount = 0;
  if (g == null) {
    this.MinimalPolysPerNode = 64;
  } else {
    this.MinimalPolysPerNode = g;
  }
  if (!m) {
    return;
  }
  this.Node = k;
  this.Root = new CL3D.SOctTreeNode;
  this.Triangles = new Array;
  for (var h = 0;h < m.MeshBuffers.length;++h) {
    var i = m.MeshBuffers[h];
    if (i) {
      var c = i.Indices.length;
      for (var a = 0;a < c;a += 3) {
        var f = i.Vertices[i.Indices[a]];
        var e = i.Vertices[i.Indices[a + 1]];
        var d = i.Vertices[i.Indices[a + 2]];
        var l = new CL3D.Triangle3d(f.Pos, e.Pos, d.Pos);
        this.Root.Triangles.push(l);
        this.Triangles.push(l);
      }
    }
  }
  this.constructTree(this.Root);
};
CL3D.OctTreeTriangleSelector.prototype = new CL3D.TriangleSelector;
CL3D.OctTreeTriangleSelector.prototype.constructTree = function(c) {
  ++this.DebugNodeCount;
  c.Box.MinEdge = c.Triangles[0].pointA.clone();
  c.Box.MaxEdge = c.Box.MinEdge.clone();
  var h;
  var b = c.Triangles.length;
  for (var e = 0;e < b;++e) {
    h = c.Triangles[e];
    c.Box.addInternalPointByVector(h.pointA);
    c.Box.addInternalPointByVector(h.pointB);
    c.Box.addInternalPointByVector(h.pointC);
  }
  if (!c.Box.MinEdge.equals(c.Box.MaxEdge) && b > this.MinimalPolysPerNode) {
    var j = c.Box.getCenter();
    var d = c.Box.getEdges();
    var f = new CL3D.Box3d;
    for (var a = 0;a < 8;++a) {
      var g = new Array;
      f.MinEdge = j.clone();
      f.MaxEdge = j.clone();
      f.addInternalPointByVector(d[a]);
      c.Child.push(new CL3D.SOctTreeNode);
      for (var e = 0;e < c.Triangles.length;++e) {
        h = c.Triangles[e];
        if (h.isTotalInsideBox(f)) {
          c.Child[a].Triangles.push(h);
        } else {
          g.push(h);
        }
      }
      c.Triangles = g;
      if (c.Child[a].Triangles.length == 0) {
        c.Child[a] = null;
      } else {
        this.constructTree(c.Child[a]);
      }
    }
  }
  this.DebugPolyCount += c.Triangles.length;
};
CL3D.OctTreeTriangleSelector.prototype.getAllTriangles = function(a, b) {
  CL3D.MeshTriangleSelector.prototype.getAllTriangles.call(this, a, b);
};
CL3D.OctTreeTriangleSelector.prototype.getTrianglesInBox = function(e, b, d) {
  if (!this.Node.AbsoluteTransformation) {
    return;
  }
  var c = new CL3D.Matrix4;
  var a = e.clone();
  if (this.Node) {
    c = this.Node.getAbsoluteTransformation().clone();
    c.makeInverse();
    c.transformBoxEx(a);
  }
  c.makeIdentity();
  if (b) {
    c = b.clone();
  }
  if (this.Node) {
    c = c.multiply(this.Node.getAbsoluteTransformation());
  }
  if (this.Root) {
    this.getTrianglesFromOctTree(this.Root, d, a, c);
  }
};
CL3D.OctTreeTriangleSelector.prototype.getTrianglesFromOctTree = function(g, e, f, a) {
  if (!g.Box.intersectsWithBox(f)) {
    return;
  }
  var d = g.Triangles.length;
  var b;
  if (a.isIdentity()) {
    for (b = 0;b < d;++b) {
      e.push(g.Triangles[b]);
    }
  } else {
    if (a.isTranslateOnly()) {
      for (b = 0;b < d;++b) {
        e.push(new CL3D.Triangle3d(a.getTranslatedVect(g.Triangles[b].pointA), a.getTranslatedVect(g.Triangles[b].pointB), a.getTranslatedVect(g.Triangles[b].pointC)));
      }
    } else {
      for (b = 0;b < d;++b) {
        e.push(new CL3D.Triangle3d(a.getTransformedVect(g.Triangles[b].pointA), a.getTransformedVect(g.Triangles[b].pointB), a.getTransformedVect(g.Triangles[b].pointC)));
      }
    }
  }
  for (b = 0;b < g.Child.length;++b) {
    var h = g.Child[b];
    if (h != null) {
      this.getTrianglesFromOctTree(h, e, f, a);
    }
  }
};
CL3D.OctTreeTriangleSelector.prototype.getRelatedSceneNode = function() {
  return this.Node;
};