clc, clear, close all;

function [s, r, b] = baseShape()
    s = [-22.5 287
    -18.5 271
    0 265.5
    18.5 271
    22.5 287
    30.177 286.306];

    r = sqrt(s(1,1)^2 + s(1,2)^2);
    alpha = abs(atan2(s(end,2), s(end,1)) - atan2(s(1,2), s(1,1)));
    b = alpha * r;
endfunction

function [sprocket] = createSprocket(baseShape, r, b, n)
    R = 1/2 * b * n / pi;
    s = [baseShape(1:end-1,1), baseShape(1:end-1,2)-r+R];
    alpha = 2*pi / n;

    sprocket = s;
    for i = 1:n-1
        angle = alpha * i;
        rotated = rotateShapeAroundOrigin(s, -angle);
        sprocket = [ sprocket ; rotated];
    endfor
    % sprocket = [ sprocket ; sprocket(1,:) ];

endfunction

function [rotated] = rotateShapeAroundOrigin(shape,angle)
    R = [cos(angle) -sin(angle); sin(angle) cos(angle)];
    rotated = R*shape';
    rotated = rotated';
endfunction

function bbox = getBBox(shape) 
    xMin = Inf;
    xMax = -Inf;
    yMin = Inf;
    yMax = -Inf;
    for i = 1:size(shape,1)
        x = shape(i,1);
        y = shape(i,2);
        if (x < xMin)
            xMin = x;
        endif
        if (x > xMax)
            xMax = x;
        endif
        if (y < yMin)
            yMin = y;
        endif
        if (y > yMax)
            yMax = y;
        endif
    endfor

    bbox = [xMin, xMax, yMin, yMax];
endfunction

function writeToSVG(sprocket, pre, post, bbox) 
    prettyPrint = false;

    if (nargin < 4)
        bbox = getBBox(sprocket);
    endif
    width = bbox(2) - bbox(1);
    height = bbox(4) - bbox(3);

    filename = [pre 'sprocket' post '.svg'];
    fid = fopen(filename, 'w+');
    fprintf(fid, '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n');
    fprintf(fid, '<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="%d %d %d %d">\n', width, height, bbox(1), bbox(3), width, height);

    fprintf(fid, '<path d="')
    if (prettyPrint)
            fprintf(fid, '\n');
        endif
    for i = 1:size(sprocket,1)
        x = sprocket(i,1);
        y = sprocket(i,2);

        if (i == 1)
            fprintf(fid, "M");
        elseif (mod(i,5) == 1)
            fprintf(fid, "L");
        elseif (mod(i,5) == 2)
            fprintf(fid, "Q");
        endif

        fprintf(fid, '%f %f ', x, y);
        if (prettyPrint)
            fprintf(fid, '\n');
        endif
    endfor
    fprintf(fid, 'Z" ');
    if (prettyPrint)
        fprintf(fid, '\n');
    endif

    fprintf(fid, 'fillRule="evenodd" fill="#3254a8" stroke-width="0.5" stroke="#000"');
    fprintf(fid, ' />\n');

    fprintf(fid, '</svg>\n');
    fclose(fid);
endfunction

function writePathDs(sprocket, pre, post, bbox) 

    if (nargin < 4)
        bbox = getBBox(sprocket);
    endif
    width = bbox(2) - bbox(1);
    height = bbox(4) - bbox(3);

    filename = [pre 'sprocket' post '.txt'];
    fid = fopen(filename, 'a');
    for i = 1:size(sprocket,1)
        x = sprocket(i,1);
        y = sprocket(i,2);

        if (i == 1)
            fprintf(fid, '"M');
        elseif (mod(i,5) == 1)
            fprintf(fid, "L");
        elseif (mod(i,5) == 2)
            fprintf(fid, "Q");
        endif

        fprintf(fid, '%f %f ', x, y);
    endfor
    fprintf(fid, 'Z", \n');

    fclose(fid);
endfunction

function writeSprocketViewPorts(sprocket, pre, post)
    filename = [pre 'viewPorts' post '.txt'];
    fid = fopen(filename, 'a');
    
    bbox = getBBox(sprocket);
    width = bbox(2) - bbox(1);
    height = bbox(4) - bbox(3);
    fprintf(fid, '[%d, %d, %d, %d],\n', bbox(1), bbox(3), width, height);
    fclose(fid);

endfunction

[baseShape, r, b] = baseShape();

nMax = 60;
sprocket = createSprocket(baseShape, r, b, nMax);
bbox = getBBox(sprocket);


for i = 0:nMax
    sprocket = createSprocket(baseShape, r, b, i);
    writeToSVG(sprocket, 'output/', num2str(i),bbox);
    writePathDs(sprocket, 'output/', 'all',bbox);
    writeSprocketViewPorts(sprocket, 'output/', 'all');
    fprintf("Sprocket %d done!\n",i);
endfor

sprocket34 = createSprocket(baseShape, r, b, 34);
figure
hold on;
plot(sprocket34(:,1), sprocket34(:,2));
% plot(sprocket30(:,1), sprocket30(:,2));
% plot(sprocket26(:,1), sprocket26(:,2));
% plot(sprocket22(:,1), sprocket22(:,2));
% plot(sprocket14(:,1), sprocket14(:,2));
% plot(sprocket10(:,1), sprocket10(:,2));
% plot(sprocket4(:,1), sprocket4(:,2));
axis equal
waitforbuttonpress