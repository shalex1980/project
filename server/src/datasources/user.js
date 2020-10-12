const { RESTDataSource } = require('apollo-datasource-rest');
const connect = require('./../mongodb/mongodb.connect');
const isEmail = require('isemail');

class UserAPI extends RESTDataSource {
    constructor() {
        super();
    }
    user
async findOrCreateUser({ email: emailArg} = {}) {

    if(!emailArg || !isEmail.validate(emailArg)) return null;

    const client =  await connect();
    const db = client.db('merch');
    const collection = db.collection('users');
    
    let user = await this._findUser(collection, emailArg);

    if(user) {

        return user && user.email ?  user.email : null;

    } else {

        const id =  await collection.insertOne({
            email: emailArg
        }).insertedId;

        user = await collection.findOne({id})

        console.log('InsertONe  ', user)

        return user && user.email ? user.email : null;
    }

    


}

async _findUser(collect, emailArg) {
    console.log(emailArg, ' EMAIL ARG')
    const user = await collect.findOne({ email : emailArg});
    return user;
}

asn


}

module.exports = UserAPI

/*

CommandResult {
  result: {
    n: 1,
    opTime: { ts: [Timestamp], t: 17 },
    electionId: 7fffffff0000000000000011,
    ok: 1,
    '$clusterTime': { clusterTime: [Timestamp], signature: [Object] },
    operationTime: Timestamp { _bsontype: 'Timestamp', low_: 1, high_: 1602157690 }
  },
  connection: Connection {
    _events: [Object: null prototype] {
      commandStarted: [Function (anonymous)],
      commandFailed: [Function (anonymous)],
      commandSucceeded: [Function (anonymous)],
      clusterTimeReceived: [Function (anonymous)]
    },
    _eventsCount: 4,
    _maxListeners: undefined,
    id: 1,
    address: '52.207.131.73:27017',
    bson: BSON {},
    socketTimeout: 360000,
    host: 'cluster0-shard-00-02.2otjk.mongodb.net',
    port: 27017,
    monitorCommands: false,
    closed: false,
    destroyed: false,
    lastIsMasterMS: 144,
    [Symbol(kCapture)]: false,
    [Symbol(description)]: StreamDescription {
      address: '52.207.131.73:27017',
      type: 'RSPrimary',
      minWireVersion: 0,
      maxWireVersion: 8,
      maxBsonObjectSize: 16777216,
      maxMessageSizeBytes: 48000000,
      maxWriteBatchSize: 100000,
      compressors: []
    },
    [Symbol(generation)]: 0,
    [Symbol(lastUseTime)]: 91688619,
    [Symbol(queue)]: Map(0) {},
    [Symbol(messageStream)]: MessageStream {
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: true,
      bson: BSON {},
      maxBsonMessageSize: 67108864,
      [Symbol(kCapture)]: false,
      [Symbol(buffer)]: [BufferList]
    },
    [Symbol(stream)]: TLSSocket {
      _tlsOptions: [Object],
      _secureEstablished: true,
      _securePending: false,
      _newSessionPending: false,
      _controlReleased: true,
      secureConnecting: false,
      _SNICallback: null,
      servername: 'cluster0-shard-00-02.2otjk.mongodb.net',
      alpnProtocol: false,
      authorized: true,
      authorizationError: null,
      encrypted: true,
      _events: [Object: null prototype],
      _eventsCount: 9,
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: 'cluster0-shard-00-02.2otjk.mongodb.net',
      _readableState: [ReadableState],
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: false,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: undefined,
      _server: null,
      ssl: [TLSWrap],
      _requestCert: true,
      _rejectUnauthorized: true,
      timeout: 360000,
      _peername: [Object],
      [Symbol(res)]: [TLSWrap],
      [Symbol(verified)]: true,
      [Symbol(pendingSession)]: null,
      [Symbol(async_id_symbol)]: 125,
      [Symbol(kHandle)]: [TLSWrap],
      [Symbol(kSetNoDelay)]: true,
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: Timeout {
        _idleTimeout: 360000,
        _idlePrev: [TimersList],
        _idleNext: [Timeout],
        _idleStart: 30820,
        _onTimeout: [Function: bound ],
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: false,
        [Symbol(refed)]: false,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 137,
        [Symbol(triggerId)]: 125
      },
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(connect-options)]: [Object],
      [Symbol(disable-renegotiation)]: true
    },
    [Symbol(clusterTime)]: { clusterTime: [Timestamp], signature: [Object] },
    [Symbol(ismaster)]: {
      hosts: [Array],
      setName: 'atlas-r8kzh1-shard-0',
      setVersion: 2,
      ismaster: true,
      secondary: false,
      primary: 'cluster0-shard-00-02.2otjk.mongodb.net:27017',
      tags: [Object],
      me: 'cluster0-shard-00-02.2otjk.mongodb.net:27017',
      electionId: 7fffffff0000000000000011,
      lastWrite: [Object],
      maxBsonObjectSize: 16777216,
      maxMessageSizeBytes: 48000000,
      maxWriteBatchSize: 100000,
      localTime: 2020-10-08T11:48:09.745Z,
      logicalSessionTimeoutMinutes: 30,
      connectionId: 26806,
      minWireVersion: 0,
      maxWireVersion: 8,
      readOnly: false,
      ok: 1,
      '$clusterTime': [Object],
      operationTime: [Timestamp]
    }
  },
  message: BinMsg {
    parsed: true,
    raw: <Buffer e6 00 00 00 b0 42 45 00 07 00 00 00 dd 07 00 00 00 00 00 00 00 d1 00 00 00 10 6e 00 01 00 00 00 03 6f 70 54 69 6d 65 00 1c 00 00 00 11 74 73 00 01 00 ... 180 more bytes>,
    data: <Buffer 00 00 00 00 00 d1 00 00 00 10 6e 00 01 00 00 00 03 6f 70 54 69 6d 65 00 1c 00 00 00 11 74 73 00 01 00 00 00 7a fc 7e 5f 12 74 00 11 00 00 00 00 00 00 ... 164 more bytes>,
    bson: BSON {},
    opts: { promoteLongs: true, promoteValues: true, promoteBuffers: false },
    length: 230,
    requestId: 4539056,
    responseTo: 7,
    opCode: 2013,
    fromCompressed: undefined,
    responseFlags: 0,
    checksumPresent: false,
    moreToCome: false,
    exhaustAllowed: false,
    promoteLongs: true,
    promoteValues: true,
    promoteBuffers: false,
    documents: [ [Object] ],
    index: 214
  },
  ops: [ { email: 'newsany@gmail.com', _id: 5f7efc7a7d3162142a058396 } ],
  insertedCount: 1,
  insertedId: 5f7efc7a7d3162142a058396
}

 */