// **********************************************************************
//
// Copyright (c) 2003-2016 ZeroC, Inc. All rights reserved.
//
// This copy of Ice is licensed to you under the terms described in the
// ICE_LICENSE file included in this distribution.
//
// **********************************************************************

(function(module, require, exports)
{
    var Ice = require("ice").Ice;
    var Test = require("Test").Test;

    var test = function(b)
    {
        if(!b)
        {
            throw new Error("test failed");
        }
    };

    class MyDerivedClassI extends Test._MyDerivedClassDisp
    {
        //
        // Override the Object "pseudo" operations to verify the operation mode.
        //
        constructor()
        {
            super();
            this._opByteSOnewayCount = 0;
        }

        ice_isA(id, current)
        {
            test(current.mode === Ice.OperationMode.Nonmutating);
            return Ice.Object.prototype.ice_isA.call(this, id, current);
        }

        ice_ping(current)
        {
            test(current.mode === Ice.OperationMode.Nonmutating);
            Ice.Object.prototype.ice_ping.call(this, current);
        }

        ice_ids(current)
        {
            test(current.mode === Ice.OperationMode.Nonmutating);
            return Ice.Object.prototype.ice_ids.call(this, current);
        }

        ice_id(current)
        {
            test(current.mode === Ice.OperationMode.Nonmutating);
            return Ice.Object.prototype.ice_id.call(this, current);
        }

        shutdown(current)
        {
            current.adapter.getCommunicator().shutdown();
        }

        opVoid(current)
        {
            test(current.mode === Ice.OperationMode.Normal);
        }

        opBool(p1, p2, current)
        {
            return [p2, p1];
        }

        opBoolS(p1, p2, current)
        {
            var p3 = p1.concat(p2);
            return [p1.reverse(), p3];
        }

        opBoolSS(p1, p2, current)
        {
            var p3 = p1.concat(p2);
            return [p1.reverse(), p3];
        }

        opByte(p1, p2, current)
        {
            return [p1, (p1 ^ p2) & 0xff];
        }

        opByteBoolD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            return [r, p1];
        }

        opByteS(p1, p2, current)
        {
            var p3 = Ice.Buffer.createNative(p1.length);
            for(let i = 0; i < p1.length; i++)
            {
                p3[i] = p1[p1.length - (i + 1)];
            }

            var r = Ice.Buffer.createNative(p1.length + p2.length);
            for(let i = 0; i < p1.length; ++i)
            {
                r[i] = p1[i];
            }
            for(let i = 0; i < p2.length; ++i)
            {
                r[i + p1.length] = p2[i];
            }
            return [r, p3];
        }

        opByteSS(p1, p2, current)
        {
            var r = p1.concat(p2);
            return [r, p1.reverse()];
        }

        opFloatDouble(p1, p2, current)
        {
            return [p2, p1, p2];
        }

        opFloatDoubleS(p1, p2, current)
        {
            var r = p2.concat(p1);
            var p4 = p2.reverse();
            return [r, p1, p4];
        }

        opFloatDoubleSS(p1, p2, current)
        {
            var r = p2.concat(p2);
            var p4 = p2.reverse();
            return [r, p1, p4];
        }

        opLongFloatD(p1, p2, current)
        {
            var r = new Ice.HashMap(p1);
            p2.forEach((value, key) => r.set(key, value));
            return [r, p1];
        }

        opMyClass(p1, current)
        {
            var p2 = p1;
            var p3 = Test.MyClassPrx.uncheckedCast(
                current.adapter.createProxy(Ice.stringToIdentity("noSuchIdentity")));
            var r = Test.MyClassPrx.uncheckedCast(current.adapter.createProxy(current.id));
            return [r, p2, p3];
        }

        opMyEnum(p1, current)
        {
            return [Test.MyEnum.enum3, p1];
        }

        opShortIntD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            return [r, p1];
        }

        opShortIntLong(p1, p2, p3, current)
        {
            return [p3, p1, p2, p3];
        }

        opShortIntLongS(p1, p2, p3, current)
        {
            return [p3, p1, p2.reverse(), p3.concat(p3)];
        }

        opShortIntLongSS(p1, p2, p3, current)
        {
            return [p3, p1, p2.reverse(), p3.concat(p3)];
        }

        opString(p1, p2, current)
        {
            return [p1 + " " + p2, p2 + " " + p1];
        }

        opStringMyEnumD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            return [r, p1];
        }

        opMyEnumStringD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            return [r, p1];
        }

        opMyStructMyEnumD(p1, p2, current)
        {
            var r = new Ice.HashMap(p1);
            p2.forEach((value, key) => r.set(key, value));
            return [r, p1];
        }

        opByteBoolDS(p1, p2, current)
        {
            var p3 = p2.concat(p1);
            var r = p1.reverse();
            return [r, p3];
        }

        opShortIntDS(p1, p2, current)
        {
            var p3 = p2.concat(p1);
            var r = p1.reverse();
            return [r, p3];
        }

        opLongFloatDS(p1, p2, current)
        {
            var p3 = p2.concat(p1);
            var r = p1.reverse();
            return [r, p3];
        }

        opStringStringDS(p1, p2, current)
        {
            var p3 = p2.concat(p1);
            var r = p1.reverse();
            return [r, p3];
        }

        opStringMyEnumDS(p1, p2, current)
        {
            var p3 = p2.concat(p1);
            var r = p1.reverse();
            return [r, p3];
        }

        opMyEnumStringDS(p1, p2, current)
        {
            var p3 = p2.concat(p1);
            var r = p1.reverse();
            return [r, p3];
        }

        opMyStructMyEnumDS(p1, p2, current)
        {
            var p3 = p2.concat(p1);
            var r = p1.reverse();
            return [r, p3];
        }

        opByteByteSD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            var p3 = new Map(p2);
            return [r, p3];
        }

        opBoolBoolSD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            var p3 = new Map(p2);
            return [r, p3];
        }

        opShortShortSD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            var p3 = new Map(p2);
            return [r, p3];
        }

        opIntIntSD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            var p3 = new Map(p2);
            return [r, p3];
        }

        opLongLongSD(p1, p2, current)
        {
            var r = new Ice.HashMap(p1);
            p2.forEach((value, key) => r.set(key, value));
            var p3 = new Ice.HashMap(p2);
            return [r, p3];
        }

        opStringFloatSD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            var p3 = new Map(p2);
            return [r, p3];
        }

        opStringDoubleSD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            var p3 = new Map(p2);
            return [r, p3];
        }

        opStringStringSD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            var p3 = new Map(p2);
            return [r, p3];
        }

        opMyEnumMyEnumSD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            var p3 = new Map(p2);
            return [r, p3];
        }

        opIntS(s, current)
        {
            return s.map(function(v, i, arr) { return -v; });
        }

        opByteSOneway(s, current)
        {
            this._opByteSOnewayCount += 1;
        }

        opByteSOnewayCallCount(current)
        {
            var count = this._opByteSOnewayCount;
            this._opByteSOnewayCount = 0;
            return count;
        }

        opContext(current)
        {
            return current.ctx;
        }

        opDoubleMarshaling(p1, p2, current)
        {
            var d = 1278312346.0 / 13.0;
            test(p1 === d);
            for(var i = 0; i < p2.length; ++i)
            {
                test(p2[i] === d);
            }
        }

        opStringS(p1, p2, current)
        {
            var p3 = p1.concat(p2);
            var r = p1.reverse();
            return [r, p3];
        }

        opStringSS(p1, p2, current)
        {
            var p3 = p1.concat(p2);
            var r = p2.reverse();
            return [r, p3];
        }

        opStringSSS(p1, p2, current)
        {
            var p3 = p1.concat(p2);
            var r = p2.reverse();
            return [r, p3];
        }

        opStringStringD(p1, p2, current)
        {
            var r = new Map(p1);
            p2.forEach((value, key) => r.set(key, value));
            return [r, p1];
        }

        opStruct(p1, p2, current)
        {
            p1.s.s = "a new string";
            return [p2, p1];
        }

        opIdempotent(current)
        {
            test(current.mode === Ice.OperationMode.Idempotent);
        }

        opNonmutating(current)
        {
            test(current.mode === Ice.OperationMode.Nonmutating);
        }

        opDerived(current)
        {
        }

        opByte1(value, current)
        {
            return value;
        }

        opShort1(value, current)
        {
            return value;
        }

        opInt1(value, current)
        {
            return value;
        }

        opLong1(value, current)
        {
            return value;
        }

        opFloat1(value, current)
        {
            return value;
        }

        opDouble1(value, current)
        {
            return value;
        }

        opString1(value, current)
        {
            return value;
        }

        opStringS1(value, current)
        {
            return value;
        }

        opByteBoolD1(value, current)
        {
            return value;
        }

        opStringS2(value, current)
        {
            return value;
        }

        opByteBoolD2(value, current)
        {
            return value;
        }

        opMyClass1(value, current)
        {
            return value;
        }

        opMyStruct1(value, current)
        {
            return value;
        }

        opStringLiterals(current)
        {
            return [
                Test.s0, Test.s1, Test.s2, Test.s3, Test.s4, Test.s5, Test.s6, Test.s7, Test.s8, Test.s9, Test.s10,
                Test.sw0, Test.sw1, Test.sw2, Test.sw3, Test.sw4, Test.sw5, Test.sw6, Test.sw7, Test.sw8, Test.sw9, Test.sw10,
                Test.ss0, Test.ss1, Test.ss2, Test.ss3, Test.ss4, Test.ss5,
                Test.su0, Test.su1, Test.su2];
        }

        opMStruct1(current)
        {
            return new Test.Structure();
        }

        opMStruct2(p1, current)
        {
            return [p1, p1];
        }

        opMSeq1(current)
        {
            return [];
        }

        opMSeq2(p1, current)
        {
            return [p1, p1];
        }

        opMDict1(current)
        {
            return new Map();
        }

        opMDict2(p1, current)
        {
            return [p1, p1];
        }
    }

    exports.MyDerivedClassI = MyDerivedClassI;
}
(typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? module : undefined,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? require : this.Ice._require,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? exports : this));
